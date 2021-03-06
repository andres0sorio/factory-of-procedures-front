import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { API_URL } from '../shared/constant/api-url';
import { ErrorHandler } from '../shared/error-handler';
import { AuthService } from '../auth/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { PROCEDURES_REQUEST } from './mock/mock-procedures-request';
import { contentHeaders } from '../shared/constant/content-headers';
import { ProcedureRequest } from './model/procedure-request';
import { Mayoralty } from './mayoralty';
import { Procedure } from './model/procedure';
import { Status } from './model/status';
import { Headers } from '@angular/http';

@Injectable()
export class ProcedureService {

    private proceduresRequest = [];
    private procedures = [];
    private procedure;
    private procedureSelected: string;
    private procedureForm: Procedure;

    constructor(
        public errorHandler: ErrorHandler,
        public apiUrl: API_URL,
        public authService: AuthService,
        public authHttp: AuthHttp
    ) { }

    private extractData(res: Response) {
        let body = res.json();
        this.proceduresRequest = body;

        return body || {};
    }


    getProcedures(): Observable<ProcedureRequest[]> {

        let options = new RequestOptions({ headers: contentHeaders });
        return this.authHttp.get(this.apiUrl.PROCEDURES(), options)
            .map(this.extractData)
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    /*
     *
     *
     */
    getDocumentProcedureRequest(doc:string, procedureID:any): Observable<ProcedureRequest[]>{
        let header  = new Headers();

       header.append('Accept-Encoding', 'gzip,deflate');
      //  header.append('Content-Type', 'image/png');

        let body = JSON.stringify(procedureID);
        return this.authHttp.get(this.apiUrl.PROCEDURES()+"documents/"+doc+"/"+procedureID+"/")
            .catch((res) => {
                console.log("ERROR: en  auth.service" );
                console.log(res)
                return Observable.throw(this.errorHandler.check(res));
            });
    }


    getUrlDocuments():any{
        return this.apiUrl.DOCUMENTS;
    }


    /**
     *
     * Obtains model from request to initiate procedure
     *
     */

    getModelProcedure(mayoraltyName: string, procedureName: string): Observable<Procedure[]> {
        let options = new RequestOptions({ headers: contentHeaders });
        return this.authHttp.get(
            this.apiUrl.PROCEDURES() + "detail/" + mayoraltyName + "/" + procedureName + "/", options)
            .map((res) => {
                console.log(res);
                let response = res.json();
                return response;
            })
            .catch((res) => {
                console.log("ERROR: en  procedure.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getProcedureById(fileNumber: string): Observable<ProcedureRequest> {
        let options = new RequestOptions({ headers: contentHeaders });
        return this.authHttp.get(this.apiUrl.CITIZENS() + "procedures/edit/" + fileNumber + "/", options)
            .map((res) => {
                return res.json();
            })
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getFunctionaryProcedureById(fileNumber: string): Observable<ProcedureRequest> {

        let options = new RequestOptions({ headers: contentHeaders });

        return this.authHttp.get(this.apiUrl.FUNCTIONARIES() + "procedures/edit/" + fileNumber + "/", options)
            .map((res) => {
                return res.json()
            })
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getdeliveryDocs() {
        return this.proceduresRequest;
    }

    getProceduresByMayoralty(mayoraltyName: string): Observable<ProcedureRequest[]> {

        let options = new RequestOptions({ headers: contentHeaders });

        return this.authHttp.get(this.apiUrl.CITIZENS() + "procedures/" + mayoraltyName + "/", options)
            .map((r: Response) => r.json() as ProcedureRequest[])
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getMayoralties(): Observable<Mayoralty[]> {

        let options = new RequestOptions({ headers: contentHeaders });

        return this.authHttp.get(this.apiUrl.CITIZENS() + "mayoralties/", options)
            .map((r: Response) => r.json() as Mayoralty[])
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getFunctionaryProcedures(): Observable<ProcedureRequest[]> {

        let options = new RequestOptions({ headers: contentHeaders });

        return this.authHttp.get(this.apiUrl.FUNCTIONARIES() + "procedures/", options)
            .map(
            (r: Response) => {
                console.log(r.json());
                return r.json();
            }
            )
            .catch((res) => {
                console.log("ERROR: en  auth.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    doStepChange(status: string, fileNumber: number, step: number, comment: string): Observable<any> {
        var newStatus = new Status(status, comment);
        let body = JSON.stringify(newStatus);
        let options = new RequestOptions({ headers: contentHeaders });

        console.log(body);
        return this.authHttp.put(this.apiUrl.FUNCTIONARIES() + "procedures/" + fileNumber + "/steps/edit/" + step + "/", body, options)
            .map((res) => {
                // console.log(res);
                return res.json()
            })
            .catch((res) => {
                console.log("Error en el servicio de procedimientos");
                return Observable.throw(this.errorHandler.check(res));
            })
    }

    setProcedureSelected(selected: string) {

        this.procedureSelected = selected;
    }

    getProcedureSelected() {

        return this.procedureSelected;
    }

    getProceduresMock(): ProcedureRequest[] {

        console.log("mock svc");
        return PROCEDURES_REQUEST;
    }

    setProcedureStarted(value: any, mayoralty: any, procedureName: any) {
        console.log("procedureStarted");
        console.log(value);
        console.log(JSON.stringify(value));
        console.log("mayoralty: " + mayoralty);
        console.log("procedureName: " + procedureName);

        let body = JSON.stringify(value);
        let options = new RequestOptions({ headers: contentHeaders });

        return this.authHttp.post(this.apiUrl.CITIZENS() + "procedures/iniciar/" + mayoralty + "/" + procedureName + "/", body, options)
            .map((res) => {
                console.log(res);
                return res.json()
            })
            .catch((res) => {
                console.log("Error en el servicio de procedimientos");
                return Observable.throw(this.errorHandler.check(res));
            })
    }
}
