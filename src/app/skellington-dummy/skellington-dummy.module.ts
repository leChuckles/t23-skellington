import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkellingtonDummyComponent } from './skellington-dummy.component';

@NgModule({
    declarations: [
        SkellingtonDummyComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        SkellingtonDummyComponent,
    ]
})
export class SkellingtonDummyModule { }
