import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SkellingtonModule } from './skellington/skellington.module';
import { SkellingtonDummyModule } from './skellington-dummy/skellington-dummy.module';
import { CommonModule } from '@angular/common';
import { SkellingtonAnimationEnum } from './skellington/models/enums/skellington-animation.enum';

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
