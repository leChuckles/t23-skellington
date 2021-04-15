import { ComponentFactoryResolver, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkellingtonDirective } from './skellington.directive';
import { SkellingtonComponent } from './components/skellington/skellington.component';
import { SkellingtonService } from './providers/skellington.service';
import { AbstractBaseModule } from './models/abstract-base-module';
import { SKELL_CONF, SkellConf } from './skellington.token';
import { SkellingtonLineComponent } from './components/skellington-line/skellington-line.component';
import { SkellingtonImgComponent } from './components/skellington-img/skellington-img.component';

@NgModule({
    declarations: [
        SkellingtonDirective,
        SkellingtonComponent,
        SkellingtonLineComponent,
        SkellingtonImgComponent,
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

    protected dynamicComponents = [ SkellingtonComponent, SkellingtonLineComponent, SkellingtonImgComponent ];

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
