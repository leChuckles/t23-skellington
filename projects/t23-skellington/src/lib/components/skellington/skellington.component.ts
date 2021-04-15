import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SkellingtonAnimationEnum } from '../../models/enums/skellington-animation.enum';
import { SkellingtonService } from '../../providers/skellington.service';

@Component({
    selector: 't23-skellington',
    templateUrl: './skellington.component.html',
    styleUrls: ['./skellington.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkellingtonComponent implements OnInit {

    @Input() public animation: SkellingtonAnimationEnum = SkellingtonAnimationEnum.PROGRESS;

    constructor(
        protected readonly skellingtonService: SkellingtonService,
    ) {}

    public ngOnInit(): void {
        this.animation = this.skellingtonService.getAnimation();
    }
}
