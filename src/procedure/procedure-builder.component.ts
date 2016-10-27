/*
* SCC
*/
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProcedureService } from './procedure.service';
import { AuthService } from '../auth/auth.service';
import { RequiredUpload } from './model/required-upload';
import { FormField } from './model/form-field';
import { Procedure } from './model/procedure';
import { FieldService } from "../builder/field.service";

import {FieldBase}          from "../builder/model/field-base";

@Component({
    selector: 'procedure-builder',
    templateUrl: 'src/procedure/templates/procedure-builder.component.html'
})

export class ProcedureBuilderComponent implements OnInit {

    title = 'Iniciar Trámite';

    private state: any;
    private mayoralty: any;
    private procedure: Procedure[];
    private procedureName: any;
    private req: RequiredUpload[];
    private fieldProcedure: FormField[];
    private fields: FieldBase<any>[] = [];

    public isAuth: boolean;
    public profile: string;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private procedureService: ProcedureService,
        private service: FieldService
    ) {

        this.isAuth = authService.isAuth();
        if (this.isAuth) {
            this.profile = authService.getProfile();
        }
    }
    private getModelProcedure() {
        this.procedureService.getModelProcedure(this.procedureName).subscribe(
            (procedure) => {
                this.procedure = procedure;
                this.req = procedure[0].required;
              //  this.fields = procedure[0].fields;
            }
        )
    }
    private setFields(fields: any) {

        console.log(this.fields);
    }
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.procedureName = params['procedure'];
            this.mayoralty = params['mayoralty'];
        });
        this.getModelProcedure();
        this.fields=this.service.getFields();
    }
}
