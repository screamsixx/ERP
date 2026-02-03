import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {
    user: string = "";
    password: string = "";

    constructor(
        private messageService: MessageService,
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) { }

    login() {
        this.authService.login(this.user, this.password).subscribe({
            next: (response) => {
                // Guardar datos en localStorage con prefijo Bearer
                localStorage.setItem('token', 'Bearer ' + response.Token);

                // Notificación de éxito
                this.messageService.add({
                    severity: 'success',
                    summary: 'Inicio de sesión exitoso',
                    detail: 'Redirigiendo al sistema...',
                    life: 2000
                });

                // Redirigir al dashboard
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 2000);
            },
            error: (error) => {
                // Notificación de error del servidor
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error de autenticación',
                    detail: 'Usuario o contraseña incorrectos',
                    life: 3000
                });
            }
        });
    }
}
