import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ProcedureAttachment} from './procedure-attachment';


import {API_URL} from '../shared/constant/api-url';
import {ErrorHandler} from '../shared/error-handler';
import {AuthService} from '../auth/auth.service';
import {PROCEDURES_REQUEST} from './mock/mock-procedures-request';

import {ProcedureRequest} from './model/procedure-request';
import {Mayoralty} from './mayoralty';
import {Procedure} from './model/procedure';
import {Status} from './model/status';
import {FieldBase} from "../builder/model/field-base";
import {FieldTextBox} from "../builder/model/field-textbox";

@Injectable()
export class ProcedureService {

    private proceduresRequest = [];
    private procedures = [];
    private procedure;
    private procedureSelected: string;
    private procedureForm: Procedure;

    constructor(public errorHandler: ErrorHandler,
        public http: Http,
        public apiUrl: API_URL,
        public authService: AuthService) {
    }


    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        this.proceduresRequest = body;
        return body || {};
    }


    getProcedures(): Observable<ProcedureRequest[]> {
        return this.http.get(this.apiUrl.CITIZENS() + "procedures/?email=" + this.authService.getUser())
            .map(this.extractData)
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getModelProcedure(procedureName: string): Observable<Procedure[]> {
        return this.http.get(
            this.apiUrl.CITIZENS() + "procedure/?email=" + this.authService.getUser() + "&procedure=" + procedureName
        )
            //.map(this.extractData)
            .map((res) => {
                let response= res.json();
            /**ERASE ME*/
                    let fields = response[0].fields;
                let fieldsProcedure: FieldBase<any>[]=[];
                for (let i in fields) {
                    fieldsProcedure.push(new FieldTextBox({
                         name: 'firstname',
                         label: fields[i].description,
                         value: fields[i].label,
                         required: true,
                     })
                    )
                    console.log(fields[i]);
                }
                response[0].fields=fieldsProcedure;
            //console.log(response);
                return response;
            })
            .catch((res) => {
                console.log("ERROR: en  procedure.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getProcedureById(fileNumber: string): Observable<ProcedureRequest> {
        console.log("procedures by Id console LOG " + this.authService.getUser());
        return this.http.get(this.apiUrl.CITIZENS() + "procedures/edit/" + fileNumber + "/?email=" + this.authService.getUser())
            .map((res) => {
                return res.json()
            })
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getFunctionaryProcedureById(fileNumber: string): Observable<ProcedureRequest> {

        return this.http.get(this.apiUrl.FUNCTIONARIES() + "procedures/edit/" + fileNumber + "/?email=" + this.authService.getUser())
            .map((res) => {
                return res.json()
            })
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getdeliveryDocs() {
        return this.proceduresRequest;//.deliveryDocs¡;
    }

    getProceduresByMayoralty(mayoraltyName: string): Observable<ProcedureRequest[]> {

        return this.http.get(this.apiUrl.CITIZENS() + "procedures/" + mayoraltyName + "/?email=" + this.authService.getUser())
            .map((r: Response) => r.json() as ProcedureRequest[])
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getMayoralties(): Observable<Mayoralty[]> {

        return this.http.get(this.apiUrl.CITIZENS() + "mayoralties/?email=" + this.authService.getUser())
            .map((r: Response) => r.json() as Mayoralty[])
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getFunctionaryProcedures(): Observable<ProcedureRequest[]> {
        return this.http.get(this.apiUrl.FUNCTIONARIES() + "procedures/?email=" + this.authService.getUser())
            .map(this.extractData)
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getAssignedProcedures(): Observable<ProcedureRequest[]> {
        return this.http.get(this.apiUrl.FUNCTIONARIES() + "procedures/?email=" + this.authService.getUser())
            .map(
            (r: Response) => {
                r.json() as ProcedureRequest[];
            }
            )
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getIdProcedures(): Observable<ProcedureRequest[]> {
        return this.http.get(this.apiUrl.FUNCTIONARIES() + "procedures/?email=" + this.authService.getUser())
            .map(
            (r: Response) => r.json() as ProcedureRequest[]
            )
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    doStepChange(status: string, fileNumber: number, step: number,comment:string): Observable<any> {

        var newStatus = new Status(status);
        let body = JSON.stringify(newStatus);

        return this.http.put(this.apiUrl.FUNCTIONARIES() + "procedures/" + fileNumber + "/steps/edit/" + step + "/?email=" + this.authService.getUser()+"&comment="+comment, body)
            .map((res) => {
                console.log(res);
                return res.json()
            })
            .catch((res) => {
                console.log("Error en el servicio de procedimientos");
                return Observable.throw(this.errorHandler.check(res));
            })
    }

    setProcedureSelected(selected: string) {
        console.log(selected);
        this.procedureSelected = selected;
    }
    getProcedureSelected() {

        return this.procedureSelected;
    }

    getProceduresMock(): ProcedureRequest[] {
        console.log("mock svc");
        return PROCEDURES_REQUEST;
    }


}
