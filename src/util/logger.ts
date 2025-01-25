export enum LogLevel {
  VERBOSE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

export enum Color {
  MAGENTA = '\x1b[1;35m',
  GREEN = '\x1b[1;32m',
  YELLOW = '\x1b[1;33m',
  RED = '\x1b[1;31m',
  WHITE = '\x1b[1;37m',
  CYAN = '\x1b[36m',
  RESET = '\x1b[1;0m',
}

const LOG_LEVEL_LABELS: Record<LogLevel, string> = {
  [LogLevel.VERBOSE]: 'VERBOSE',
  [LogLevel.DEBUG]: '  DEBUG',
  [LogLevel.INFO]: '   INFO',
  [LogLevel.WARN]: '   WARN',
  [LogLevel.ERROR]: '  ERROR',
  [LogLevel.FATAL]: '  FATAL',
};

const LOG_LEVEL_COLORS: Record<LogLevel, Color> = {
  [LogLevel.VERBOSE]: Color.CYAN,
  [LogLevel.DEBUG]: Color.MAGENTA,
  [LogLevel.INFO]: Color.GREEN,
  [LogLevel.WARN]: Color.YELLOW,
  [LogLevel.ERROR]: Color.RED,
  [LogLevel.FATAL]: Color.WHITE,
};

type Message = string | number | boolean | Record<string, unknown> | unknown[] | null | undefined;

export class Logger {
  protected readonly name: string;
  protected readonly logLevel: LogLevel;
  protected readonly formatter: Intl.DateTimeFormat;
  protected cachedTimestamp: string;
  protected timestampLastUpdated: number;

  constructor(
    name: string,
    logLevel: LogLevel = LogLevel.INFO,
    locale: string = 'en-US',
    formatterOptions: Intl.DateTimeFormatOptions = {},
  ) {
    this.name = name;
    this.logLevel = logLevel;
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

    this.verbose = this.logLevel > LogLevel.VERBOSE ? this.noop : this.verbose;
    this.debug = this.logLevel > LogLevel.DEBUG ? this.noop : this.debug;
    this.info = this.logLevel > LogLevel.INFO ? this.noop : this.info;
    this.warn = this.logLevel > LogLevel.WARN ? this.noop : this.warn;
    this.error = this.logLevel > LogLevel.ERROR ? this.noop : this.error;
  }

  verbose(...messages: Message[]): void {
    this.write(LogLevel.VERBOSE, messages);
  }

  debug(...messages: Message[]): void {
    this.write(LogLevel.DEBUG, messages);
  }

  info(...messages: Message[]): void {
    this.write(LogLevel.INFO, messages);
  }

  warn(...messages: Message[]): void {
    this.write(LogLevel.WARN, messages);
  }

  error(...messages: Message[]): void {
    this.write(LogLevel.ERROR, messages);
  }

  fatal(...messages: Message[]): void {
    this.write(LogLevel.FATAL, messages);
  }

  protected noop(): void {}

  protected write(level: LogLevel, messages: Message[]): void {
    const color = LOG_LEVEL_COLORS[level];
    const header = this.formatHeader(level);
    const msg = `${color}${this.formatMessage(messages)}${Color.RESET}`;

    process.stdout.write(`${header} ${msg}\n`);
  }

  protected formatHeader(level: LogLevel): string {
    const color = LOG_LEVEL_COLORS[level];
    const nameColor = process.env.NO_COLOR ? [] : Color.YELLOW;

    const lib = `${color}[lib-native]${Color.RESET}`;
    const pid = `${color}${process.pid}${Color.RESET}`;
    const timestamp = this.timestamp;
    const lvl = `${color}${LOG_LEVEL_LABELS[level]}${Color.RESET}`;
    const name = `${nameColor}[${this.name}]${Color.RESET}`;

    return `${lib} ${pid} - ${timestamp} ${lvl} ${name}`;
  }

  protected formatMessage(messages: Message[]): string {
    let formattedString = '';

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      switch (typeof message) {
        case 'string':
        case 'number':
        case 'boolean':
          formattedString += `${message}`;
          break;
        case 'undefined':
          formattedString += 'undefined';
          break;
        case 'object':
          formattedString += message ? JSON.stringify(message) : 'null';
          break;
        default:
          formattedString += `${message}`;
      }

      if (i < messages.length - 1) {
        formattedString += ' ';
      }
    }

    return formattedString;
  }

  protected get timestamp(): string {
    if (Date.now() - this.timestampLastUpdated >= 1000) {
      this.cachedTimestamp = this.formatter.format(Date.now());
      this.timestampLastUpdated = Date.now();
    }

    return this.cachedTimestamp;
  }
}
