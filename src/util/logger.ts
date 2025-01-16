enum LogLevel {
  DEBUG = '  DEBUG',
  LOG = '    LOG',
  WARN = '   WARN',
  ERROR = '  ERROR',
  FATAL = '  FATAL',
  VERBOSE = 'VERBOSE',
}

enum Color {
  MAGENTA = '\x1b[1;35m',
  GREEN = '\x1b[32m',
  YELLOW = '\x1b[1;33m',
  RED = '\x1b[1;31m',
  WHITE = '\x1b[1;37m',
  CYAN = '\x1b[36m',
  RESET = '\x1b[1;0m',
}

type Message = string | number | boolean | Record<string, unknown> | unknown[] | null | undefined;

export class Logger {
  private readonly name: string;
  private readonly formatter: Intl.DateTimeFormat;

  private cachedTimestamp: string;
  private timestampLastUpdated: number;

  constructor(name: string, locale: string = 'en-US', formatterOptions: Intl.DateTimeFormatOptions = {}) {
    this.name = name;
    this.formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      ...formatterOptions,
    });

    this.cachedTimestamp = this.timestamp;
    this.timestampLastUpdated = 1000;
  }

  debug(...messages: Message[]): void {
    this.write(LogLevel.DEBUG, Color.MAGENTA, messages);
  }

  log(...messages: Message[]): void {
    this.write(LogLevel.LOG, Color.GREEN, messages);
  }

  warn(...messages: Message[]): void {
    this.write(LogLevel.WARN, Color.YELLOW, messages);
  }

  error(...messages: Message[]): void {
    this.write(LogLevel.ERROR, Color.RED, messages);
  }

  fatal(...messages: Message[]): void {
    this.write(LogLevel.FATAL, Color.WHITE, messages);
  }

  verbose(...messages: Message[]): void {
    this.write(LogLevel.VERBOSE, Color.CYAN, messages);
  }

  logFunctionCall<Args extends unknown[], Result extends unknown>(
    functionName: string,
    functionArguments: Args,
    functionResult: Result,
  ): void {
    const header = this.formatHeader(LogLevel.DEBUG, Color.MAGENTA);

    const fnName = `${Color.YELLOW}${functionName}${Color.RESET}`;
    const fnArgs = functionArguments
      .map((arg) => `${Color.CYAN}${JSON.stringify(arg)}${Color.RESET}`)
      .join(', ');
    const arrow = `${Color.GREEN}=>${Color.RESET}`;
    const fnResult = `${Color.GREEN}${functionResult}${Color.RESET}`;

    process.stdout.write(`${header} ${fnName}(${fnArgs}) ${arrow} ${fnResult}\n`);
  }

  private write(level: LogLevel, color: Color, messages: Message[]): void {
    const header = this.formatHeader(level, color);
    const msg = `${color}${this.formatMessage(messages)}${Color.RESET}`;

    process.stdout.write(`${header} ${msg}\n`);
  }

  private formatHeader(level: LogLevel, color: Color): string {
    const nameColor = process.env.NO_COLOR ? [] : Color.YELLOW;

    const lib = `${color}[lib-native]${Color.RESET}`;
    const pid = `${color}${process.pid}${Color.RESET}`;
    const timestamp = this.timestamp;
    const lvl = `${color}${level}${Color.RESET}`;
    const name = `${nameColor}[${this.name}]${Color.RESET}`;

    return `${lib} ${pid} - ${timestamp} ${lvl} ${name}`;
  }

  private formatMessage(messages: Message[]): string {
    const parts: string[] = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      switch (typeof message) {
        case 'string':
        case 'number':
        case 'boolean':
          parts.push(`${message}`);
          break;
        case 'undefined':
          parts.push('undefined');
          break;
        case 'object':
          parts.push(message ? JSON.stringify(message) : 'null');
          break;
        default:
          parts.push(`${message}`);
      }
    }

    return parts.join(' ');
  }

  private get timestamp(): string {
    if (Date.now() - this.timestampLastUpdated >= 1000) {
      this.cachedTimestamp = this.formatter.format(Date.now());
      this.timestampLastUpdated = Date.now();
    }

    return this.cachedTimestamp;
  }
}
