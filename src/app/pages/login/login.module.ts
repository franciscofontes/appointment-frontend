import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        HeaderModule
    ],
    providers: [
        AuthService,
        StorageService,
    ]
})
export class LoginModule { }
