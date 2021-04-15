import { Type } from '@angular/core';
import { SkellingtonOptions } from './skellington-options';

export interface SkellConf {
    dynamicComponents?: Array<Type<any>>;
    options?: SkellingtonOptions;
}
