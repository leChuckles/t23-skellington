import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Input,
    Output,
    ViewContainerRef,
    ViewRef,
    EventEmitter,
    Type,
    ComponentRef, OnInit, OnDestroy
} from '@angular/core';
import { SkellingtonService } from './providers/skellington.service';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';

@Directive({
    // tslint:disable-next-line:directive-selector
  selector: '[skellLine]'
})
export class SkellLineDirective implements OnInit, OnDestroy {
    protected readonly mutationObserver: MutationObserver | undefined;
    protected readonly destroyed$: Subject<void> = new Subject();
    protected readonly changesSubject: Subject<Array<MutationRecord>> = new Subject();
    protected readonly changes$: Observable<Array<MutationRecord>> = this.changesSubject.asObservable();

    protected _component: string = 'app-skellington-line';

    @Input() public count: number = 1;

    @Input() public set skelloading(loading: boolean) {
        if (loading) { this.clearSkellingtonLine(); }
    }

    @Input() public set skellLine(component: string) {
        if (!component) { return; }

        this._component = component;
    }
    public get skellLine(): string {
        return this._component;
    }

    protected ref: ViewRef | Array<ViewRef> | undefined;

    constructor(
        protected readonly elementRef: ElementRef,
        protected readonly vcr: ViewContainerRef,
        protected readonly service: SkellingtonService,
        protected readonly cdr: ChangeDetectorRef,
    ) {
        const element = this.elementRef.nativeElement;

        this.mutationObserver = new MutationObserver((mutations: Array<MutationRecord>) => {
            this.changesSubject.next(mutations);
        });

        this.mutationObserver.observe(element, {
            childList: true,
            characterData: true,
            subtree: true,
        });
    }

    public ngOnInit(): void {
        console.log('COUNT: ', this.count);
        this.createSkellingtonLine(this.skellLine);

        this.changes$
            .pipe(
                takeUntil(this.destroyed$),
                map((mutations: Array<MutationRecord>) => {
                    return mutations.find(mutation => {
                        return !!mutation.target.textContent || Array.from(mutation.addedNodes).some(node => !!node.nodeValue);
                    });
                }),
                filter(mutation => !!mutation),
                tap(console.log),
            )
            .subscribe(() => this.clearSkellingtonLine());
    }

    public async create(component: string): Promise<ViewRef> {

        return this.service
            .getComponentBySelector(
                component,
                () => import('./skellington.module').then(m => m.SkellingtonModule)
            )
            .then(componentRef => {
                this.setStyling(this.elementRef, componentRef);

                this.insertComponentView(componentRef);


                return componentRef.hostView;
            });
    }

    public async createSkellingtonLine(component: string): Promise<void> {
        if (!this.ref) {
            const length = new Array(this.count).fill(0);

            this.ref = await Promise.all(length.map(() => this.create(component)));

            this.elementRef.nativeElement.hidden = true;
            this.cdr.detectChanges();
        }
    }

    public clearSkellingtonLine(): void {
        this.elementRef.nativeElement.hidden = false;
        this.cdr.detectChanges();
        this.vcr.clear();
        this.ref = undefined;
    }

    protected insertComponentView(componentRef: ComponentRef<unknown>): void {
        this.vcr.insert(componentRef.hostView);
    }

    protected setStyling(element: ElementRef, componentRef: ComponentRef<unknown>): void {
        const styles = ['margin', 'padding', ['font-size', 'height']];

        styles.forEach((style: string | Array<string>) => {
            const isArray = (val: string | Array<string>): val is Array<string> => {
                return Array.isArray(val);
            };
            if (!isArray(style)) {
                componentRef.location.nativeElement.style[style] = this.getPropertyStyleValue(this.elementRef, style);
            } else {
                componentRef.location.nativeElement.style[style[1]] = this.getPropertyStyleValue(this.elementRef, style[0]);
            }
        });
    }

    protected getPropertyStyleValue(element: ElementRef, property: string): string {
        return window.getComputedStyle(element.nativeElement, null).getPropertyValue(property);
    }

    public ngOnDestroy(): void {
        console.log('DESTROY: ');
        this.mutationObserver.disconnect();
        this.destroyed$.next();
    }
}
