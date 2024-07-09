import { styleText } from 'node:util';

const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const colorMap: Record<string, Parameters<typeof styleText>[0]> = {
  DEBUG: ['magenta'],
  LOG: ['green'],
  WARN: ['yellow'],
  ERROR: ['red'],
  FATAL: ['white', 'bold'],
  VERBOSE: ['cyan'],
};

export class Logger {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  debug(...message: string[]): void {
    this.write('DEBUG', message.join(' '));
  }

  log(...message: string[]): void {
    this.write('LOG', message.join(' '));
  }

  warn(...message: string[]): void {
    this.write('WARN', message.join(' '));
  }

  error(...message: string[]): void {
    this.write('ERROR', message.join(' '));
  }

  fatal(...message: string[]): void {
    this.write('FATAL', message.join(' '));
  }

  verbose(...message: string[]): void {
    this.write('VERBOSE', message.join(' '));
  }

  private write(level: keyof typeof colorMap, message: string): void {
    const modifiers = colorMap[level];

    const lib = styleText(modifiers, '[libos]');
    const pid = styleText(modifiers, process.pid.toString());
    const timestamp = formatter.format(new Date());
    const lvl = styleText(modifiers, level.padStart(7));
    const name = styleText(['yellow'], `[${this.name}]`);
    const msg = styleText(modifiers, message);

    process.stdout.write(`${lib} ${pid} - ${timestamp} ${lvl} ${name} ${msg}\n`);
  }
}
