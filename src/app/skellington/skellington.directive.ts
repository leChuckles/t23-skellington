import { ChangeDetectorRef, Directive, ElementRef, Input, ViewContainerRef, ViewRef } from '@angular/core';
import { SkellingtonService } from './providers/skellington.service';

@Directive({
    // tslint:disable-next-line:directive-selector
  selector: '[skellington]'
})
export class SkellingtonDirective {

    @Input() public props = {
        count: 3,
    };

    @Input() public set skelloading(loading: boolean) {
        if (loading) { this.clearSkellington(); }
    }

    @Input() public set skellington(component: string) {
        this.createSkellington(component);
    }

    protected ref: ViewRef | undefined;

    constructor(
        protected readonly elementRef: ElementRef,
        protected readonly vcr: ViewContainerRef,
        protected readonly service: SkellingtonService,
        protected readonly cdr: ChangeDetectorRef,
    ) {}

    public async create(component: string): Promise<ViewRef> {
        return this.service
            .getComponentBySelector(
                component,
                () => import('./skellington.module').then(m => m.SkellingtonModule)
            )
            .then(componentRef => {
                componentRef.location.nativeElement.classList = this.elementRef.nativeElement.classList;
                this.vcr.insert(componentRef.hostView);
                if (this.props && Object.keys(this.props).length > 0) {
                    Object
                        .entries(this.props)
                        .forEach(([key, value]) => {
                            componentRef.instance[key] = value;
                        });
                }
                return componentRef.hostView;
            });
    }

    public async createSkellington(component?: string): Promise<void> {
        if (!this.ref) {
            this.ref = !!component ? await this.create(component) : await this.create('app-skellington');

            this.elementRef.nativeElement.hidden = true;
            this.cdr.detectChanges();
        }
    }

    public clearSkellington(): void {
        this.elementRef.nativeElement.hidden = false;
        this.cdr.detectChanges();
        this.vcr.clear();
        this.ref = undefined;
    }

}
