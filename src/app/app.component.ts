import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

    protected loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
    public loading$: Observable<boolean> = this.loadingSubject.asObservable();

    public text: string | undefined;
    lines: any = [0, 0, 0];

    public ngOnInit(): void {
        setTimeout(() => {
            this.text = 'foo';
            this.loadingSubject.next(true);
        }, 3500);
    }
}
