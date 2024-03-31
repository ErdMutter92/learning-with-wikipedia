import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'wordbank',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './wordbank.component.html',
    styleUrls: ['./wordbank.component.scss']
})
export class WordbankComponent {
    @Input() label: string = 'Wordbank';
    @Input() words: string[] = [];
}