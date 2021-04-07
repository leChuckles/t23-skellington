import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SkellingtonModule } from './skellington/skellington.module';
import { SkellingtonDummyModule } from './skellington-dummy/skellington-dummy.module';
import { SkeletonsComponent } from './skeletons/skeleton/skeletons.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        SkellingtonModule.forRoot({
            dynamicComponents: [ SkeletonsComponent ],
        }),
        SkellingtonDummyModule,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
