import { InjectionToken, Type } from '@angular/core';
import { SkellingtonAnimationEnum } from './models/enums/skellington-animation.enum';

export const SKELL_CONF = new InjectionToken<SkellConf>('APP_CONFIG_PARAMS');

export interface SkellingtonOptions {
    animation: SkellingtonAnimationEnum;
}

export interface SkellConf {
    dynamicComponents?: Array<Type<any>>;
    options?: SkellingtonOptions;
}
