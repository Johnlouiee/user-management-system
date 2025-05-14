import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';
import { Role } from './_models/role';

const routes: Routes = [
    { 
        path: '', 
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { 
                path: 'dashboard', 
                component: DashboardComponent,
                canActivate: [AuthGuard, RoleGuard],
                data: { roles: [Role.Admin] }
            },
            { 
                path: 'account',
                loadChildren: () => import('./account/account.module').then(x => x.AccountModule)
            }
        ]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
