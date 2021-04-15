import { Compiler, ComponentFactory, ComponentRef, Inject, Injectable, Injector, NgModuleFactory, Optional } from '@angular/core';
import { AbstractBaseModule } from '../models/abstract-base-module';
import { SKELL_CONF, SkellConf } from '../skellington.token';
import { SkellingtonAnimationEnum } from '../models/enums/skellington-animation.enum';

@Injectable()
export class SkellingtonService {

    constructor(
        protected readonly injector: Injector,
        @Optional() @Inject(SKELL_CONF) private config: SkellConf,
    ) {}

    public getAnimation(): SkellingtonAnimationEnum {
        console.log('THIS: ', this.config.options);
        return !!this.config.options ? this.config.options.animation : SkellingtonAnimationEnum.PROGRESS;
    }

    public getComponentBySelector(
        componentSelector: string,
        moduleLoaderFunction: () => Promise<any>
    ): Promise<ComponentRef<unknown & { animation?: SkellingtonAnimationEnum }>> {
        return this.getModuleFactory(moduleLoaderFunction).then(moduleFactory => {

            const module = moduleFactory.create(this.injector);

            if (module.instance instanceof AbstractBaseModule) {
                const dynamicComponents = !!this.config ? this.config.dynamicComponents : [];
                const compFactory: ComponentFactory<
                    any
                    > = module.instance.getComponentFactory(componentSelector, dynamicComponents);

                if (!compFactory) {
                    throw Error('Cant find your component ' + componentSelector);
                }

                return compFactory.create(module.injector, [], null, module);
            } else {
                throw new Error('Module should extend BaseModule to use "string" based component selector');
            }
        });
    }

    public async getModuleFactory(
        moduleLoaderFunction: () => Promise<NgModuleFactory<any>>
    ): Promise<NgModuleFactory<any>> {
        const ngModuleOrNgModuleFactory = await moduleLoaderFunction();
        let moduleFactory;
        if (ngModuleOrNgModuleFactory instanceof NgModuleFactory) {
            // AOT
            moduleFactory = ngModuleOrNgModuleFactory;
        } else {
            // JIT
            moduleFactory = await this.injector
                .get(Compiler)
                .compileModuleAsync(ngModuleOrNgModuleFactory);
        }
        return moduleFactory;
    }
}
