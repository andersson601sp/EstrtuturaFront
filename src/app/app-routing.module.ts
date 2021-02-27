import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelComponent } from './components/panel/panel.component';
import { HomeComponent } from './views/home/home.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './login';
import { AuthGuard } from './helpers';
import { Role } from './models';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';


const routes: Routes = [
  {
    path: '',
    component: PanelComponent, canActivate: [AuthGuard],  children: [
      {  path: '',   component: HomeComponent,   canActivate: [AuthGuard], pathMatch: 'full'  },
      {  path: 'home',   component: HomeComponent,   canActivate: [AuthGuard], },
      {  path: 'user',   component: UserComponent,    canActivate: [AuthGuard]},
      {  path: 'user/create',   component: UserCreateComponent,    canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
      {  path: 'user/edit/:id',   component: UserUpdateComponent,    canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
      {  path: 'user/delete/:id',   component: UserDeleteComponent,    canActivate: [AuthGuard], data: { roles: [Role.Admin] }}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },

// caso contrário, redirecione para home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
