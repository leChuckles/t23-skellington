# Skellington

WIP

## Demo
1. [Live Preview](https://skellington-mxaqc.ondigitalocean.app/)

## Install
Right now you can only install the project via npm
```npm install t23-skellington``` 

## Setup
You need to add ``SkellingtonModule`` to the module you want to use the Skeleton in. 
This way ``<t23-skellington></t23-skellington>`` and the ``t23Skellington`` Directive are usable in your application.

```typescript 
    @NgModule({
        declarations: [
            AppComponent,
        ],
        imports: [
            ...
            SkellingtonModule,
            ...
        ],
        bootstrap: [ AppComponent ]
    })
```

#### Using ```SkellingtonModule.forRoot()```
Skellington-Module can be imported ``forRoot()``.
You can pass in your own custom components to be displayed and setup global defaults like animation.

```typescript 
    @NgModule({
        declarations: [
            AppComponent,
        ],
        imports: [
            ...
            SkellingtonModule.forRoot({
                 dynamicComponents: [ YourCustomSkeletonComponent ],
                 options: {
                     animation: SkellingtonAnimationEnum.PROGRESS,
                 }
             }),
            ...
        ],
        bootstrap: [ AppComponent ]
    })
```

## Usage

Skellington can be implemented in several ways.

#### As a component - will not disappear automatically \
```html
    <t23-skellington [count]="3" [animation]="'progress'">YOUR CONTENT</t23-skellington>
```
- ``animation``: takes ``None`` or ``progress`` | (default: `progress`) | can be configured globally
- ``count``: takes a numeric value and describes the amount of lines to be created | (default: `1`)
- ``skelloading``: if the dynamic removal of skeletons doesn't work you can pass in your own detection (when to remove) | (default: `true`)
#### As a directive - will very likely disappear automatically \
When used as a directive, Skellington will try to determine if content was loaded by looking at 
1. changed nodes
1. changed src attribute for img
1. changed text content
```html
    <p t23Skellington [count]="3" [animation]="'progress'">YOUR CONTENT</div>
```
- ``animation``: takes ``None`` or ``progress`` | (default: `progress`) | can be configured globally
- ``count``: takes a numeric value and describes the amount of lines to be created | (default: `1`)
- ``t23Skellington``: if you globally registered dynamic components, you can pass your own components via selector in here | (default: `t23-skellington`)
- additionally you can pass in a TemplateRef directly from inside the component your using, e.g.
```html
    <div>
        <ng-template #yourTemplate>
            <div>
                <t23-skellington></t23-skellington>
                <t23-skellington></t23-skellington>
                <t23-skellington></t23-skellington>
            </div>
        </ng-template>
        <div [skellington]="yourTemplate">
            {{ longText }}
        </div>
    </div>
```

## Development

#### Run demo locally
1. After installing the dependencies run `ng serve` or `npm run start` for a dev server.
Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

#### Running unit tests
1. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
