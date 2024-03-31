import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatDividerModule } from "@angular/material/divider";

@Component({
    standalone: true,
    selector: 'reader-footer',
    imports: [
        CommonModule,
        MatDividerModule,
    ],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class ReaderFooterComponent {
    @Input() public wordCount: number = 0;
    @Input() public guessCount: number = 0;
}