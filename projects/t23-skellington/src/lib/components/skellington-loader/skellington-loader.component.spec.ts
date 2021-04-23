import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkellingtonService } from '../../providers/skellington.service';
import { SkellingtonAnimationEnum } from '../../models/enums/skellington-animation.enum';
import { MockProvider } from 'ng-mocks';
import { SkellingtonLoaderComponent } from './skellington-loader.component';

describe('SkellingtonLoaderComponent', () => {
    let component: SkellingtonLoaderComponent;
    let skellingtonService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ SkellingtonLoaderComponent ],
            providers: [
                SkellingtonLoaderComponent,
                MockProvider(SkellingtonService, {
                    getAnimation: () => SkellingtonAnimationEnum.NONE,
                }),
            ]
        })
            .compileComponents();

        skellingtonService = TestBed.inject(SkellingtonService);
        component = TestBed.inject(SkellingtonLoaderComponent);
    });

    it('should should have PROGRESS as default', () => {
        expect(component.animation).toBe(SkellingtonAnimationEnum.PROGRESS);
    });


    it('should should have NONE after ngOnInit', () => {
        component.ngOnInit();
        expect(component.animation).toBe(SkellingtonAnimationEnum.NONE);
    });
});




