import { NgModule } from '@angular/core';
import { DigitOnlyDirective } from './digit-only.directive';
import { AuthorityDirective } from './authority.directive';

@NgModule({
  declarations: [
    DigitOnlyDirective,
    AuthorityDirective
  ],
  imports: [
  ],
  exports: [
    DigitOnlyDirective,
    AuthorityDirective
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class DirectivesModule { }
