import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProcedureAttachment } from './procedure-attachment';

@Component({
    selector: 'procedure-form',
    templateUrl: 'app/procedure/templates/procedure-form.component.html'
})

export class ProcedureFormComponent {

    title = 'Nuevo Trámite';

    file = new ProcedureAttachment('');
}
