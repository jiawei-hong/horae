import { ConfigType } from './constants';
import { Config } from './type';

class Horae {
  config: Config = {
    name: 'config',
  };

  constructor(name: string, type: ConfigType = ConfigType.JSON) {
    this.config.name = name;
    this.config.type = type;
  }
}

export { Horae };
