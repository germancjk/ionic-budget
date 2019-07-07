import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fixdate'
})

export class FixdatePipe implements PipeTransform {
    transform(d: string): string {

        let year  = d.slice(0, 4);
        let month = d.slice(4, 6);
        let day = d.slice(6, 8);

        return `${day}/${month}/${year}`;
    }
}
