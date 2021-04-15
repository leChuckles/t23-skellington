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
    public heading: string | undefined;
    public longText: string | undefined;
    lines: any = [ 0 ];
    src: any;

    public ngOnInit(): void {
        setTimeout(() => {
            this.heading = 'FOOBAR';
            this.text = 'foo';
            this.longText = 'Lucas ipsum dolor sit amet raynar lumiya rodian fel k-3po aruzan vader zorba dorvalla noa. Cerean firrerreo jubnuk felth raynar  ugnaught hutt nomi. Gonk qui-gonn gungan watto. Artaru bane daala calamari tono. Drovian mace mon dressellian felucia lando yuvernian luuke. Bibble ryn voxyn jinn ranat devaronian windu shadda. Katarn biggs mirax winter kathol naberrie.';
            this.loadingSubject.next(true);
            this.src = 'http://www.klangundkleid.de/img/plakate/film/back-to-the-future-poster-delorean-kaufen-g877315-20200326192200.jpg';
        }, 5000);
    }
}
