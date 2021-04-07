import { ComponentFactoryResolver, ComponentRef, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkellingtonDirective } from './skellington.directive';
import { SkellingtonComponent } from './skellington/skellington.component';
import { SkellingtonService } from './providers/skellington.service';
import { SkeletonsComponent } from '../skeletons/skeleton/skeletons.component';
import { AbstractBaseModule } from './models/abstract-base-module';
import { SKELL_CONF, SkellConf } from './skellington.token';

@NgModule({
    declarations: [
        SkellingtonDirective,
        SkellingtonComponent,
    ],
    imports: [
        CommonModule,
    ],
    providers: [
        SkellingtonService,
    ],
    exports: [
        SkellingtonDirective,
        SkellingtonComponent,
    ],
})
export class SkellingtonModule extends AbstractBaseModule {

    protected dynamicComponents = [ SkellingtonComponent ];

    constructor(componentFactoryResolver: ComponentFactoryResolver) {
        super(componentFactoryResolver);
    }

    static forRoot(config: SkellConf): ModuleWithProviders<SkellingtonModule> {
        return {
            ngModule: SkellingtonModule,
            providers: [ { provide: SKELL_CONF, useValue: config } , SkellingtonService ]
        };
    }
}
