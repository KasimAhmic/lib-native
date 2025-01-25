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

  invoke<
    FunctionReturnType extends Win32Type<Nominal<unknown, unknown>>,
    const FunctionArgumentTypes extends Win32Type<Nominal<unknown, unknown>>[],
  >(
    functionName: string,
    functionReturnType: FunctionReturnType,
    functionArgumentTypes: FunctionArgumentTypes,
    functionArguments: any[],
  ): NonNullable<FunctionReturnType['__jsType']> {
    if (!this.loaded) {
      throw new Error(`Library ${this.name} is not loaded`);
    }

    const func = this.getFunction(functionName, functionReturnType, functionArgumentTypes);

    const result = func(...functionArguments);

    this.logger.logFunctionCall(functionName, functionArguments, result);

    return result;
  }

  private getFunction(
    functionName: string,
    functionReturnType: Win32Type<Nominal<unknown, unknown>>,
    functionArgumentTypes: any[],
  ) {
    let cachedFunction = this.functionCache[functionName];

    if (cachedFunction) {
      return cachedFunction;
    }

    const func = this.lib.func('__stdcall', functionName, functionReturnType, functionArgumentTypes);

    this.functionCache[functionName] = func;

    return func;
  }
}
