import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-skellington',
    templateUrl: './skellington.component.html',
    styleUrls: ['./skellington.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkellingtonComponent implements AfterViewInit {

    public lineCount: Array<number> = [0, 0, 0];

    @Input() public skelloading: boolean = false;
    @ViewChild('dynamicSkeleton') public dynamicSkeleton;

    public set lines(lines: number) {
        this.lineCount = new Array(lines).fill(0);
    }

    public ngAfterViewInit(): void {
        console.log('DYN: ', this.dynamicSkeleton);
    }
}
