import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechercheComponent } from './recherche/recherche.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
    {path: '', redirectTo: '/recherche', pathMatch: 'full'},
    {path: 'recherche', component: RechercheComponent},
    {path: 'recherche/:type', component: RechercheComponent},
    {path: 'detail/:name', component: DetailComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
