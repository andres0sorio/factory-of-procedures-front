import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MainMenuComponent } from './main-menu/main-menu.component';

import { CheckUserDirective } from './check-user.directive';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [
        MainMenuComponent,
        CheckUserDirective
    ],
    exports: [
        MainMenuComponent,
        CheckUserDirective,
        CommonModule, FormsModule
    ]
})

export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                // None for the moment
            ]
        }
    }
}