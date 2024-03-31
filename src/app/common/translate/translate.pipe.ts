import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    standalone: true,
    name: 'translate',
})
export class TranslatePipe implements PipeTransform {
    public transform(value: string, ...args: any[]): string {
        return value;
    }
}