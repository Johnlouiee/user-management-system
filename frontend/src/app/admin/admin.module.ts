import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [], // No components declared
    imports: [
        CommonModule,
        SharedModule,
        AdminRoutingModule
    ]
})
export class AdminModule { }