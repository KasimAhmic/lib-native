import { inspect } from 'node:util';

import { Color, LogLevel, Logger } from './logger';

export class FunctionLogger extends Logger {
  private ignoreList: string[];

  constructor(name: string, locale: string = 'en-US', formatterOptions: Intl.DateTimeFormatOptions = {}) {
    super(name, locale, formatterOptions);
  }

  ignore(...functionNames: string[]): void {
    this.ignoreList.push(...functionNames);
  }

  // TODO: This may not handle every type properly, might need to look into it again in the future
  logFunctionCall(functionName: string, functionArguments: unknown[], functionResult: unknown): void {
    if (this.ignoreList.includes(functionName)) {
      return;
    }

    const header = this.formatHeader(LogLevel.VERBOSE);

    const fnName = `${Color.GREEN}${functionName}${Color.RESET}`;
    let fnArgs = '';
    const arrow = `${Color.GREEN}=>${Color.RESET}`;
    const fnResult = `${Color.GREEN}${this.parseType(functionResult)}${Color.RESET}`;

    for (let i = 0; i < functionArguments.length; i++) {
      fnArgs += `${Color.CYAN}${this.parseType(functionArguments[i])}${Color.RESET}${i < functionArguments.length - 1 ? ', ' : ''}`;
    }

    process.stdout.write(`${header} ${fnName}(${fnArgs}) ${arrow} ${fnResult}\n`);
  }

  private parseType(value: unknown): string {
    switch (typeof value) {
      case 'string':
        return `"${value}"`;
      case 'number':
      case 'bigint':
      case 'boolean':
        return `${value}`;
      case 'undefined':
        return 'undefined';
      case 'object':
        return value === null ? 'null' : inspect(value, { depth: 1, compact: true, breakLength: Infinity });
      default:
        return typeof value;
    }
  }
}
