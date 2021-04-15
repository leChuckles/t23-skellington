import { SkellingtonService } from '../providers/skellington.service';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { SkellingtonComponent } from '../components/skellington/skellington.component';
import { SkellingtonAnimationEnum } from '../models/enums/skellington-animation.enum';
import { SkellingtonDirective } from './skellington.directive';
import { ElementRef, ViewContainerRef } from '@angular/core';

describe('SkellingtonDirective', () => {
    let directive: SkellingtonDirective;
    let skellingtonService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SkellingtonDirective ],
            providers: [
                SkellingtonComponent,
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

