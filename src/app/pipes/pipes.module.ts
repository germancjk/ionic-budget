import { NgModule } from '@angular/core';

// Pipes
import { FixdatePipe } from '../pipes/fixdate.pipe';
import { CategoriesPipe } from '../pipes/categories.pipe';
import { TranslatePipe } from '../pipes/translate.pipe';

@NgModule({
  declarations: [
    FixdatePipe,
    CategoriesPipe,
    TranslatePipe
  ],
  exports: [
    FixdatePipe,
    CategoriesPipe,
    TranslatePipe
  ]
})
export class PipesModule {}
