import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ProcedureAttachment } from './procedure-attachment';


import { API_URL } from '../shared/constant/api-url';
import { ErrorHandler } from '../shared/error-handler';
import { AuthService } from '../auth/auth.service';
import { PROCEDURES_REQUEST } from './mock/mock-procedures-request';

import { ProcedureRequest } from './model/procedure-request';
import { Mayoralty } from './mayoralty';

@Injectable()
export class ProcedureService {

    private proceduresRequest = [];
    private procedures = [];
    private procedure;

    constructor(

        public errorHandler: ErrorHandler,
        public http: Http,
        public apiUrl: API_URL,
        public authService: AuthService
    ) { }

    getProcedures(): Observable<ProcedureRequest[]> {
        return this.http.get(this.apiUrl.CITIZENS() + "procedures/?email=" + this.authService.getUser())
            .map(this.extractData)
            .catch((res) => {
                console.log("ERROR: en  auth.service");
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
        console.log("procedure request:");
        console.log(this.proceduresRequest)
        return this.proceduresRequest;//.deliveryDocs¡;
    }

    private extractData(res: Response) {
        let body = res.json();
        this.proceduresRequest = body;

        console.log(body);
        return body || {};
    }

    getProceduresByMayoralty(mayoraltyName: string): Observable<ProcedureRequest[]> {

        return this.http.get(this.apiUrl.CITIZENS() + "procedures/"+ mayoraltyName +"/?email=" + this.authService.getUser())
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

    doStepApproval(status: string, fileNumber: number): Observable<any> {

        let body = JSON.stringify("{status:" + status + ", email:f@h}");

        return this.http.put(this.apiUrl.FUNCTIONARIES() + "procedures/" + fileNumber + "/steps/edit/0/", body)
            .map((res) => { res.json() })
            .catch((res) => {
                console.log("Error en el servicio de procedimientos");
                return Observable.throw(this.errorHandler.check(res));
            })

    }


    getProceduresMock(): ProcedureRequest[] {
        console.log("mock svc");
        return PROCEDURES_REQUEST;
    }
}
