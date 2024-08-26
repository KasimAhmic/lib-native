import chalk, { BackgroundColorName, ColorName, ForegroundColorName, ModifierName } from 'chalk';

type ChalkStyle =
  | ModifierName
  | ForegroundColorName
  | BackgroundColorName
  | ColorName;

function styleText(styles: ChalkStyle[], text: string): string {
  let styledText = text;

  styles.forEach((style) => {
    const styleFunction = chalk[style];

    styledText = styleFunction(styledText);
  });

  return styledText;
}

const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const colorMap: Record<string, Modifiers> = {
  DEBUG: ['magenta'],
  LOG: ['green'],
  WARN: ['yellow'],
  ERROR: ['red'],
  FATAL: ['white', 'bold'],
  VERBOSE: ['cyan'],
};

type Modifiers = Parameters<typeof styleText>[0];

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
    const modifiers = process.env.NO_COLOR ? [] : colorMap[level];
    const nameModifiers: Modifiers = process.env.NO_COLOR ? [] : ['yellow'];

    const lib = styleText(modifiers, '[lib-native]');
    const pid = styleText(modifiers, process.pid.toString());
    const timestamp = formatter.format(new Date());
    const lvl = styleText(modifiers, level.padStart(7));
    const name = styleText(nameModifiers, `[${this.name}]`);
    const msg = styleText(modifiers, message);

    process.stdout.write(`${lib} ${pid} - ${timestamp} ${lvl} ${name} ${msg}\n`);
  }
}
