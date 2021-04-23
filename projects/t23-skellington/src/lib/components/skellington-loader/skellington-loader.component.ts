import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SkellingtonAnimationEnum } from '../../models/enums/skellington-animation.enum';
import { SkellingtonService } from '../../providers/skellington.service';

@Component({
    selector: 't23-skellington-loader',
    templateUrl: './skellington-loader.component.html',
    styleUrls: ['./skellington-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkellingtonLoaderComponent implements OnInit {

    @Input() public animation: SkellingtonAnimationEnum = SkellingtonAnimationEnum.PROGRESS;

    constructor(
        protected readonly skellingtonService: SkellingtonService,
    ) {}

    public ngOnInit(): void {
        this.animation = this.skellingtonService.getAnimation();
    }
}
