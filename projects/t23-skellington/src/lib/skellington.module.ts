import { ComponentFactoryResolver, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkellingtonDirective } from './directives/skellington.directive';
import { SkellingtonService } from './providers/skellington.service';
import { AbstractBaseModule } from './models/abstract-base-module';
import { SKELL_CONF } from './models/skellington.token';
import { SkellConf } from './models/interfaces/skellington-config';
import { SkellingtonLoaderComponent } from './components/skellington-loader/skellington-loader.component';
import { SkellingtonComponent } from './components/skellington/skellington.component';

@NgModule({
    declarations: [
        SkellingtonDirective,
        SkellingtonLoaderComponent,
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
        SkellingtonLoaderComponent,
        SkellingtonComponent,
    ],
})
export class SkellingtonModule extends AbstractBaseModule {

    protected dynamicComponents = [ SkellingtonLoaderComponent ];

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
