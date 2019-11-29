import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogViewComponent } from './catalog-view/catalog-view.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';

const routes: Routes = [
  {path: '', component: CatalogViewComponent},
  {path: 'catalogItem/:id', component: CatalogItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
