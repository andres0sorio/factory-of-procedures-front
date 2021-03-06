import {Component, OnInit} from '@angular/core';

import {StateService} from '../state/state.service';
import {ProcedureService} from './procedure.service';
import {ProcedureRequest} from './model/procedure-request';
import {Mayoralty} from './mayoralty';
import {State} from '../state/state';


@Component({
    selector: 'select-procedure',
    templateUrl: 'src/procedure/templates/procedure-select.component.html',
    providers: [ProcedureService]
})

export class ProcedureSelectComponent implements OnInit {
    title = 'Seleccione el trámite que desea realizar';

    states: State[];
    state: any;
    mayoralty: any;
    procedure: any;

    mayoralties: Mayoralty[];
    procedures: ProcedureRequest[];

    //@Input() status;

    mode = 'Observable'

    selectedElement: string;

    error: any;

    errorMessage: string;

    constructor(private stateService: StateService,
                private procedureService: ProcedureService) {
    }

    getStates() {
        this.stateService.getStates()
            .then(states => this.states = states);
    }

    getCities() {
        this.procedureService.getMayoralties().subscribe(
            mayoralties => this.mayoralties = mayoralties,
            error => this.errorMessage = <any>error
        );
    }

    getProceduresByMayoralty() {
        this.procedureService.getProceduresByMayoralty(this.mayoralty).subscribe(
            procedures => this.procedures = procedures,
            error => this.errorMessage = <any>error
        );
    }

    setProcedureSelected() {
        this.procedureService.setProcedureSelected(this.procedure)
    }

    ngOnInit() {
        this.getStates();
    }
}
