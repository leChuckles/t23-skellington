import { InjectionToken, Type } from '@angular/core';

export const SKELL_CONF = new InjectionToken<SkellConf>('APP_CONFIG_PARAMS');

export interface SkellConf {
    dynamicComponents: Array<Type<any>>;
}
