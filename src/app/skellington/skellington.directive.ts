import { ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';
import { SkellingtonService } from './providers/skellington.service';
import { Observable, Subject } from 'rxjs';
import { filter, map, skip, takeUntil } from 'rxjs/operators';
import { SkellingtonAnimationEnum } from './models/enums/skellington-animation.enum';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[skellington], [t23Skeleton]'
})
export class SkellingtonDirective implements OnInit, OnDestroy {
    protected readonly mutationObserver: MutationObserver | undefined;
    protected readonly destroyed$: Subject<void> = new Subject();
    protected readonly changesSubject: Subject<Array<MutationRecord>> = new Subject();
    protected readonly changes$: Observable<Array<MutationRecord>> = this.changesSubject.asObservable();
    protected _component: string = 'app-skellington';
    protected _templateRef: TemplateRef<unknown> | undefined;

    @Input() public count: number = 1;
    @Input() public animation: SkellingtonAnimationEnum;

    @Input() public set skelloading(loading: boolean) {
        if (loading) { this.clearSkellingtonComponent(); }
    }

    @Input() public set skellington(component: string | TemplateRef<unknown>) {
        // NG TEMPLATE
        if (!component) { return; }
        if (typeof component === 'string') {
            this._component = component;
        } else {
            this._templateRef = component;
        }
    }

    protected ref: ViewRef | Array<ViewRef> | undefined;

    constructor(
        protected readonly elementRef: ElementRef,
        protected readonly vcr: ViewContainerRef,
        protected readonly service: SkellingtonService,
    ) {
        const element = this.elementRef.nativeElement;

        this.mutationObserver = new MutationObserver((mutations: Array<MutationRecord>) => {
            this.changesSubject.next(mutations);
        });

        this.mutationObserver.observe(element, {
            childList: true,
            characterData: true,
            subtree: true,
            attributes: true,
        });
    }

    public ngOnInit(): void {
        !!this._templateRef ? this.insertTemplateView(this._templateRef) : this.createSkellingtonComponent(this._component);

        this.changes$
            .pipe(
                takeUntil(this.destroyed$),
                skip(1),
                map((mutations: Array<MutationRecord>) => mutations.find(m => {

                    if (m.target.nodeName.toLowerCase() === 'img' && m.attributeName === 'src') {
                        return m.target.childNodes;
                    }

                    return !!m.target.nodeValue && !!m.target.nodeValue.trim();
                })),
                filter(mutation => !!mutation),
            )
            .subscribe(() => this.clearSkellingtonComponent());
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
                if (!!componentRef.instance.animation) {
                    componentRef.instance.animation = this.animation || this.service.getAnimation();
                }
                return componentRef.hostView;
            });
    }

    public async createSkellingtonComponent(component: string): Promise<void> {
        if (!this.ref) {
            const lineCount = new Array(this.count).fill(0);
            this.ref = await Promise.all(lineCount.map(() => this.create(component)));
        }
    }

    public clearSkellingtonComponent(): void {
        this.elementRef.nativeElement.hidden = false;
        this.vcr.clear();
        this.ref = undefined;
    }

    protected insertComponentView(componentRef: ComponentRef<unknown>): void {
        this.vcr.insert(componentRef.hostView);
        this.elementRef.nativeElement.hidden = true;
    }

    protected insertTemplateView(templateRef: TemplateRef<unknown>): void {
        this.vcr.createEmbeddedView(templateRef);
        this.elementRef.nativeElement.hidden = true;
    }

    protected setStyling(element: ElementRef, componentRef: ComponentRef<unknown>): void {
        const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'p', 'small', 'span'];
        let styles: (string | Array<string>)[] = ['margin', 'padding', 'width', 'position', 'top', 'left', 'right', 'bottom'];

        if (textTags.includes(element.nativeElement.nodeName.toLowerCase())) {
            styles = [...styles, ['font-size', 'height']];
        } else {
            styles = [...styles, 'height'];
        }

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
        this.mutationObserver.disconnect();
        this.destroyed$.next();
    }
}
