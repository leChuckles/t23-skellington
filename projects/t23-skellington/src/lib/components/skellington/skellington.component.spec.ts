import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkellingtonComponent } from './skellington.component';
import { SkellingtonService } from '../../providers/skellington.service';
import { SkellingtonAnimationEnum } from '../../models/enums/skellington-animation.enum';
import { MockProvider } from 'ng-mocks';

describe('SkellingtonComponent', () => {
    let component: SkellingtonComponent;
    let skellingtonService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SkellingtonComponent ],
            providers: [
                SkellingtonComponent,
                MockProvider(SkellingtonService, {
                    getAnimation: () => SkellingtonAnimationEnum.NONE,
                }),
            ]
        })
            .compileComponents();

        skellingtonService = TestBed.inject(SkellingtonService);
        component = TestBed.inject(SkellingtonComponent);
    });

    it('should should have PROGRESS as default', () => {
        expect(component.animation).toBe(SkellingtonAnimationEnum.PROGRESS);
    });


    it('should should have NONE after ngOnInit', () => {
        component.ngOnInit();
        expect(component.animation).toBe(SkellingtonAnimationEnum.NONE);
    });
});




