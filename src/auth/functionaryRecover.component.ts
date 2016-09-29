import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

import { Citizen } from '../citizen/citizen';
import { Login } from './login';

declare var jQuery: any;

@Component({
    selector: 'functionary-recover-form',
    templateUrl: 'src/auth/templates/functionaryRecover.component.html',
})

export class FunctionaryRecoverComponent {

    title = 'Recuperar Constraseña';

    login = new Login("", "", NaN, 'functionary');

    error: any;

    constructor(private authService: AuthService, private router: Router) { }

    submitted = false;

    resetPassword(login: Login) {
        this.authService
            .resetPassword(this.login)
            .subscribe(
            (res) => {
                jQuery('.modal-title').html("Recuperar Contraseña");
                jQuery('.modal-body').html("Una nueva contraseña ha sido enviada a su e-mail registrado.");
                jQuery('.modal').modal('show');
                console.log(res.json());
                this.router.navigate(['login']);
            },
            (error) => {

                this.error = error;
                console.log(this.error);
            });
    }

    get diagnostic() { return JSON.stringify(this.login); }
}