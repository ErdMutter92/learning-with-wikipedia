import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";

@Component({
    standalone: true,
    selector: 'counter',
    imports: [
        CommonModule,
        MatDividerModule,
    ],
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
    @Input() public label!: string;
    @Input() public count: number = 0;
}