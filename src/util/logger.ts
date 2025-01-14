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

  debug(...message: string[]): void {
    this.write(LogLevel.DEBUG, Color.MAGENTA, message.join(' '));
  }

  log(...message: string[]): void {
    this.write(LogLevel.LOG, Color.GREEN, message.join(' '));
  }

  warn(...message: string[]): void {
    this.write(LogLevel.WARN, Color.YELLOW, message.join(' '));
  }

  error(...message: string[]): void {
    this.write(LogLevel.ERROR, Color.RED, message.join(' '));
  }

  fatal(...message: string[]): void {
    this.write(LogLevel.FATAL, Color.WHITE, message.join(' '));
  }

  verbose(...message: string[]): void {
    this.write(LogLevel.VERBOSE, Color.CYAN, message.join(' '));
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

  private write(level: LogLevel, color: Color, message: string): void {
    const header = this.formatHeader(level, color);
    const msg = `${color}${message}${Color.RESET}`;

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

  private get timestamp(): string {
    if (Date.now() - this.timestampLastUpdated >= 1000) {
      this.cachedTimestamp = this.formatter.format(Date.now());
      this.timestampLastUpdated = Date.now();
    }

    return this.cachedTimestamp;
  }
}
