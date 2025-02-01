import koffi from 'koffi';

import { Nominal, Win32Type } from '../@types';
import { FunctionLogger } from '../util/function-logger';

export class Library {
  private readonly name: string;
  private readonly path: string;
  private readonly logger: FunctionLogger;
  private readonly functionCache: Record<string, any> = {};

  private lib: koffi.IKoffiLib;
  private loaded: boolean = false;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.logger = new FunctionLogger(this.constructor.name);

    this.logger.ignore(
      'GetMessageW',
      'DispatchMessageW',
      'TranslateMessage',
      'TranslateAcceleratorW',
      'DefWindowProcW',
    );
  }

  load() {
    if (this.loaded) {
      this.logger.warn(`Library ${this.name} is already loaded`);
    } else {
      this.logger.debug(`Loading library ${this.name} from ${this.path}`);

      this.lib = koffi.load(this.path);

      this.loaded = true;

      this.logger.debug(`Library ${this.name} loaded`);

      process.on('exit', () => {
        this.unload();
      });
    }
  }

  unload() {
    if (this.loaded) {
      this.logger.debug(`Unloading library ${this.name} from ${this.path}`);

      this.lib.unload();

      this.logger.debug(`Library ${this.name} unloaded`);

      this.loaded = false;
    } else {
      this.logger.warn(`Library ${this.name} is already unloaded`);
    }
  }

  // TODO: The commented out `invoke` and `getFunction` signatures work very well to enforce the number and
  // types of arguments passed to the functions however they don't really work at all when passing structs
  // and pointers to structs. I think I can fix this by exporting Nominal types and Win32Type types from the
  // struct definitions but this will require a bit of rework. I'll look into it later.
  //
  // Famous last words...

  // invoke<
  //   FunctionReturnType extends Win32Type<Nominal<unknown, unknown>>,
  //   const FunctionArgumentTypes extends Win32Type<Nominal<unknown, unknown>>[],
  //   const FunctionArguments extends {
  //     [K in keyof FunctionArgumentTypes]: Nominal<
  //       FunctionArgumentTypes[K]['__jsType'],
  //       FunctionArgumentTypes[K][typeof Symbol.species]
  //     > | null;
  //   },
  // >(
  //   functionName: string,
  //   functionReturnType: FunctionReturnType,
  //   functionArgumentTypes: FunctionArgumentTypes,
  //   functionArguments: FunctionArguments,
  //   cacheKey?: string,
  // ): NonNullable<FunctionReturnType['__jsType']>
  invoke<
    FunctionReturnType extends Win32Type<Nominal<unknown, unknown>>,
    const FunctionArgumentTypes extends Win32Type<Nominal<unknown, unknown>>[],
  >(
    functionName: string,
    functionReturnType: FunctionReturnType,
    functionArgumentTypes: FunctionArgumentTypes,
    functionArguments: any[],
    functionCacheKey?: string,
  ): NonNullable<FunctionReturnType['__jsType']> {
    if (!this.loaded) {
      throw new Error(`Library ${this.name} is not loaded`);
    }

    const func = this.getFunction(functionName, functionReturnType, functionArgumentTypes, functionCacheKey);

    const result = func(...functionArguments);

    this.logger.logFunctionCall(functionName, functionArguments, result);

    return result;
  }

  // private getFunction<
  //   FunctionReturnType extends Win32Type<Nominal<unknown, unknown>>,
  //   const FunctionArgumentTypes extends Win32Type<Nominal<unknown, unknown>>[],
  //   const FunctionArguments extends {
  //     [K in keyof FunctionArgumentTypes]: Nominal<
  //       FunctionArgumentTypes[K]['__jsType'],
  //       FunctionArgumentTypes[K][typeof Symbol.species]
  //     > | null;
  //   },
  // >(
  //   functionName: string,
  //   functionReturnType: FunctionReturnType,
  //   functionArgumentTypes: FunctionArgumentTypes,
  //   cacheKey?: string,
  // ): KoffiFunc<(...args: FunctionArguments) => FunctionReturnType>
  private getFunction(
    functionName: string,
    functionReturnType: Win32Type<Nominal<unknown, unknown>>,
    functionArgumentTypes: any[],
    functionCacheKey?: string,
  ) {
    const cacheKey = functionCacheKey ?? functionName;

    let cachedFunction = this.functionCache[cacheKey];

    if (cachedFunction) {
      return cachedFunction;
    }

    const func = this.lib.func('__stdcall', functionName, functionReturnType, functionArgumentTypes);

    this.functionCache[cacheKey] = func;

    return func;
  }
}
