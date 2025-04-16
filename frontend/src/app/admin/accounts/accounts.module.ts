import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountsRoutingModule } from './accounts-routing.module';
import { SharedModule } from '../../shared.module';

@NgModule({
    declarations: [], // No non-standalone components
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        AccountsRoutingModule
    ]
})
export class AccountsModule { }