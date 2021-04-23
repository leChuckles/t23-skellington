import { SkellingtonService } from '../providers/skellington.service';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { SkellingtonAnimationEnum } from '../models/enums/skellington-animation.enum';
import { SkellingtonDirective } from './skellington.directive';
import { ElementRef, ViewContainerRef } from '@angular/core';
import { SkellingtonLoaderComponent } from '../components/skellington-loader/skellington-loader.component';

describe('SkellingtonDirective', () => {
    let directive: SkellingtonDirective;
    let skellingtonService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SkellingtonDirective ],
            providers: [
                SkellingtonLoaderComponent,
                MockProvider(SkellingtonService, {
                    getAnimation: () => SkellingtonAnimationEnum.NONE,
                }),
                MockProvider(ViewContainerRef),
                MockProvider(ElementRef),
            ]
        })
            .compileComponents();

        skellingtonService = TestBed.inject(SkellingtonService);
        directive = TestBed.inject(SkellingtonDirective);
    });
});

