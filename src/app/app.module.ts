import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SkellingtonDummyModule } from './skellington-dummy/skellington-dummy.module';
import { CommonModule } from '@angular/common';
import { SkellingtonModule } from '../../projects/t23-skellington/src/lib/skellington.module';
import { SkellingtonAnimationEnum } from '../../projects/t23-skellington/src/lib/models/enums/skellington-animation.enum';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        SkellingtonModule.forRoot({
            dynamicComponents: [],
            options: {
                animation: SkellingtonAnimationEnum.PROGRESS,
            }
        }),
        SkellingtonDummyModule,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
