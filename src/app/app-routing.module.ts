import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModelComponent } from './model/model.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo:"/"},
  {path: "", component: HomeComponent, title: "Home"},
  {path: "model", component: ModelComponent, title: "Model"},
  {path: "map", component: MapComponent, title: "Map in 2d"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
