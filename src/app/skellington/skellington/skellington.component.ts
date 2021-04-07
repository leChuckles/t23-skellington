import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-skellington',
    templateUrl: './skellington.component.html',
    styleUrls: ['./skellington.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkellingtonComponent {

    public lineCount: Array<number> = [0, 0, 0];

    public set lines(lines: number) {
        this.lineCount = new Array(lines).fill(0);
    }
}
