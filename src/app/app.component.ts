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

    protected loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public loading$: Observable<boolean> = this.loadingSubject.asObservable();

    public text: string | undefined;
    public heading: string | undefined;
    public longText: string | undefined;
    public lines: any = [ 0, 0, 0 ];
    public src: string | undefined;

    public customComponent1 = `
         <div class="grid__item">
            <ng-container *ngIf="loading$ | async; else content">
                <div [skellington]="'app-skellington-card'" [count]="1"></div>
            </ng-container>
            <ng-template #content>
                Lucas ipsum dolor sit amet raynar lumiya rodian fel k-3po aruzan vader zorba dorvalla noa.
                Cerean firrerreo jubnuk felth raynar ugnaught hutt nomi. Gonk qui-gonn gungan watto.
                Artaru bane daala calamari tono. Drovian mace mon dressellian felucia lando yuvernian luuke.
                Bibble ryn voxyn jinn ranat devaronian windu shadda. Katarn biggs mirax winter kathol naberrie.
            </ng-template>
        </div>
    `;

    public template = `
        <div class="grid">
            <ng-template #test>
                <div class="grid__item">
                    <t23-skellington></t23-skellington>
                    <t23-skellington></t23-skellington>
                    <t23-skellington></t23-skellington>
                </div>
            </ng-template>
            <div [skellington]="test" class="grid__item">
                {{ longText }}
            </div>
        </div>
    `;

    public darkCard = `
        <app-dummy class="grid__item dark">
            <div>
                <div>
                    <img [src]="src" skellington/>
                </div>
                <h1 skellington>{{ text }}</h1>
            </div>
            <p skellington [count]="5">{{ longText }}</p>
            <div class="actions">
                <button skellington class="actions__button">
                    {{ text }}
                </button>
            </div>
        </app-dummy>
    `;

    public card = `
        <app-dummy class="grid__item">
            <div>
                <div>
                    <img [src]="src" skellington/>
                </div>
                <h1 skellington>{{ text }}</h1>
            </div>
            <p skellington [count]="5">{{ longText }}</p>
            <div class="actions">
                <button skellington class="actions__button">
                    {{ text }}
                </button>
            </div>
        </app-dummy>
    `;

    public roundDarkCard = `
        <app-dummy class="grid__item rounded dark">
            <div>
                <div>
                    <img [src]="src" skellington/>
                </div>
                <h1 skellington>{{ text }}</h1>
            </div>
            <p skellington [count]="5">{{ longText }}</p>
            <div class="actions">
                <button skellington class="actions__button">
                    {{ text }}
                </button>
            </div>
        </app-dummy>
    `;

    public cardcard = `
        <app-dummy class="grid__item dark">
            <div style="width: 100%; height: 250px;">
                <img [src]="src" skellington/>
            </div>
            <div>
                <h1 skellington>{{ text }}</h1>
                <p skellington [count]="5">{{ longText }}</p>
                <div class="actions">
                    <button skellington class="actions__button">
                        {{ text }}
                    </button>
                </div>
            </div>
        </app-dummy>
    `;

    public ngOnInit(): void {
        setTimeout(() => {
            this.heading = 'FOOBAR';
            this.text = 'foo';
            this.longText = 'Lucas ipsum dolor sit amet raynar lumiya rodian fel k-3po aruzan vader zorba dorvalla noa. Cerean firrerreo jubnuk felth raynar  ugnaught hutt nomi. Gonk qui-gonn gungan watto. Artaru bane daala calamari tono. Drovian mace mon dressellian felucia lando yuvernian luuke. Bibble ryn voxyn jinn ranat devaronian windu shadda. Katarn biggs mirax winter kathol naberrie.';
            this.loadingSubject.next(false);
            this.src = 'http://www.klangundkleid.de/img/plakate/film/back-to-the-future-poster-delorean-kaufen-g877315-20200326192200.jpg';
        }, 5000);
    }
}
