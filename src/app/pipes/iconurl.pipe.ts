import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'iconurl'
})

export class IconurlPipe implements PipeTransform {
    transform(value: string): string {

        let icon: string;

        // call categories

        let obj = categories.find((o, index) => {

          if (o.id === id) {
            icon = '../../../assets/icons/' + this.categories[index].icon;
            return true; // stop searching
          }
        });

        return icon;
    }
}
