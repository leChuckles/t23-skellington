import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SkellingtonAnimationEnum } from '../../models/enums/skellington-animation.enum';

@Component({
    selector: 'app-skellington-line',
    templateUrl: './skellington-line.component.html',
    styleUrls: ['./skellington-line.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkellingtonLineComponent {

    @Input() public animation: SkellingtonAnimationEnum = SkellingtonAnimationEnum.PROGRESS;
}
