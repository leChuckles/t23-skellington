import { ComponentFactoryResolver, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkellingtonDirective } from './skellington.directive';
import { SkellingtonService } from './providers/skellington.service';
import { AbstractBaseModule } from './models/abstract-base-module';
import { SKELL_CONF } from './skellington.token';
import { SkellingtonComponent } from './components/skellington/skellington.component';
import { SkellConf } from './models/interfaces/skellington-config';

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
