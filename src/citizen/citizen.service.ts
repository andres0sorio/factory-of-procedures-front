import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { API_URL } from '../shared/constant/api-url';
import { AuthHttp } from 'angular2-jwt';
import { Citizen } from './citizen';
import { Dependency } from './dependency';
import { contentHeaders } from '../shared/constant/content-headers';
import { ErrorHandler } from '../shared/error-handler';


@Injectable()
export class CitizenService {

    constructor(
        public errorHandler: ErrorHandler,
        public http: Http,
        public apiUrl: API_URL,
        public authHttp: AuthHttp
    ) { }


    getCitizen(id: number) {
        return this.getCitizens()
            .toPromise()
            .then(citizens => citizens.find(citizen => citizen.id === id));
    }

    getCitizens() {

        let req = new Request({
            method: "GET",
            url: this.apiUrl.CITIZENS()
        });

        return this.authHttp.request(req)
            .map(res => res.json());
    }

    getCitizenslist(): Observable<Citizen[]> {

        let options = new RequestOptions({ headers: contentHeaders });

        return this.authHttp.get(this.apiUrl.ADMIN(), options)
            .map((r: Response) => r.json() as Citizen[])
            .catch((res) => {
                console.log("ERROR: en  citizen.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    getDependencieslist(): Observable<Dependency[]> {

        let options = new RequestOptions({ headers: contentHeaders });

        return this.authHttp.get(this.apiUrl.ADMIN()+ "dependencies/", options)
            .map((r: Response) => r.json() as Dependency[])
            .catch((res) => {
                console.log("ERROR: en  citizen.service");
                return Observable.throw(this.errorHandler.check(res));
            });
    }

    createFunctionary(functionary: any) {

        let body = JSON.stringify(functionary);
        let options = new RequestOptions({ headers: contentHeaders });

        return this.http.post(this.apiUrl.ADMIN(), body, options)
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
}
