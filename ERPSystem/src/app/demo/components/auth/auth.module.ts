import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MessageService } from 'primeng/api'; // 1. Importa el servicio
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ToastModule // 2. Importa el módulo del toast
    ],
    providers: [
        MessageService // 3. Provee el servicio a nivel de módulo
    ]
})
export class AuthModule { }
