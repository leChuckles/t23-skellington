import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SkellingtonModule } from './skellington/skellington.module';
import { SkellingtonDummyModule } from './skellington-dummy/skellington-dummy.module';
import { SkeletonsComponent } from './skeletons/skeleton/skeletons.component';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
    declarations: [
        AppComponent,
        SkeletonsComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        NgxSkeletonLoaderModule.forRoot(),
        SkellingtonModule.forRoot({
            dynamicComponents: [ SkeletonsComponent, NgxSkeletonLoaderComponent ],
        }),
        SkellingtonDummyModule,
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }
