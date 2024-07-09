import { close, open } from 'ffi-rs';

import { Logger } from '../util/logger';

export class Library {
  private readonly name: string;
  private readonly path: string;
  private readonly logger: Logger;

  private loaded: boolean = false;

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.logger = new Logger(this.constructor.name);
  }

  load() {
    if (this.loaded) {
      this.logger.warn(`Library ${this.name} is already loaded`);
    } else {
      this.logger.debug(`Loading library ${this.name} from ${this.path}`);

      open({ library: this.name, path: this.path });

      this.loaded = true;

      this.logger.debug(`Library ${this.name} loaded`);
    }
  }

  unload() {
    if (this.loaded) {
      this.logger.debug(`Unloading library ${this.name} from ${this.path}`);

      close(this.name);

      this.logger.debug(`Library ${this.name} unloaded`);

      this.loaded = false;
    } else {
      this.logger.warn(`Library ${this.name} is already unloaded`);
    }
  }
}
