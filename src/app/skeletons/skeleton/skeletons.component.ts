import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-skeletons',
    templateUrl: './skeletons.component.html',
    styleUrls: ['./skeletons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonsComponent {

    // tslint:disable-next-line:variable-name
    protected _count = 4;

    @Input() public set count(lines: number) {
        this._count = lines;
        this.cdr.detectChanges();
    }

    public get count(): number {
        return this._count;
    }

    constructor(
        protected readonly cdr: ChangeDetectorRef,
    ) {
    }
}
