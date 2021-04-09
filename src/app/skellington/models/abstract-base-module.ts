import { ComponentFactory, ComponentFactoryResolver, Type } from '@angular/core';

export abstract class AbstractBaseModule {

    private selectorToFactoryMap: { [key: string]: ComponentFactory<any> } = null;

    protected abstract dynamicComponents: Array<Type<any>>; // similar to entryComponents

    protected constructor(
        protected componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    public getComponentFactory(selector: string, dynamicComponents: Array<Type<any>>): ComponentFactory<any> {
        if (!this.selectorToFactoryMap) {
            this.populateRegistry(dynamicComponents);
        }

        return this.selectorToFactoryMap[selector];
    }

    protected populateRegistry(dynamicComponents: Array<Type<any>>): void {
        this.selectorToFactoryMap = {};
        const components = [ ...dynamicComponents, ...this.dynamicComponents ];

        if (
            Array.isArray(components) &&
            components.length > 0
        ) {
            components.forEach(compType => {
                const componentFactory: ComponentFactory<
                    any
                    > = this.componentFactoryResolver.resolveComponentFactory(compType);
                this.selectorToFactoryMap[componentFactory.selector] = componentFactory;
            });
        }
    }
}
