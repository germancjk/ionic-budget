import { Pipe, PipeTransform } from '@angular/core';
import { ExtrasService } from '../services/extras.service';

@Pipe({
    name: 'categories'
})

export class CategoriesPipe implements PipeTransform {

  constructor( private extrasService: ExtrasService) {}

    transform(value: number, tipo: string): string {

      let result: string;

      if (tipo === 'iconurl') {
        result = this.extrasService.icon(value);
      } else {
        if (tipo === 'name') {
          result = this.extrasService.name(value);
        }
      }

      return result;
    }
}
