import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-skeletons',
    templateUrl: './skeletons.component.html',
    styleUrls: ['./skeletons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonsComponent {

    public lineCount: Array<number> = [0];

    public set lines(lines: number) {
        this.lineCount = new Array(lines).fill(0);
    }
}
