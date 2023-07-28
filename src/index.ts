import { ConfigType } from './constants';
import { Config } from './type';
import fs from 'fs';

class Horae<T> {
  config: Config<T> = {
    name: 'config',
  };

  constructor(name: string, type: ConfigType = ConfigType.JSON) {
    this.config.name = name;
    this.config.type = type;
    this.initialize();
  }

  initialize() {
    const fileName = `${this.config.name}.${this.config.type}`;
    const hasFile = fs.existsSync(fileName);

    if (hasFile) {
      const data: T = JSON.parse(
        fs.readFileSync(`${this.config.name}.${this.config.type}`, 'utf8')
      );
      this.config.data = data;
    } else {
      throw new Error(`[Error]: Not found file`);
    }
  }
}

export { Horae };
