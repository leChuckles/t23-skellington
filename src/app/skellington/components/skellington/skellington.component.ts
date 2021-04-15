import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SkellingtonAnimationEnum } from '../../models/enums/skellington-animation.enum';
import { SkellingtonService } from '../../providers/skellington.service';

@Component({
    selector: 'app-skellington',
    templateUrl: './skellington.component.html',
    styleUrls: ['./skellington.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkellingtonComponent {

    @Input() public animation: SkellingtonAnimationEnum = SkellingtonAnimationEnum.PROGRESS;

    constructor(
        protected readonly skellingtonService: SkellingtonService,
    ) {
        this.animation = skellingtonService.getAnimation();
    }
}
