import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthenticationGuardService } from './services/authentication-guard.service';
import { AuthorityGuardService } from './services/authority-guard.service';
import { StorageService } from './services/storage.service';
import { DirectivesModule } from './shared/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  providers: [
    AuthenticationGuardService,
    AuthorityGuardService,
    StorageService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
