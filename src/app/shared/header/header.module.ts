import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class HeaderModule { }
