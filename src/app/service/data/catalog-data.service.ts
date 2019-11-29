import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Catalog } from 'src/app/catalog-view/catalog-view.component';
import { CATALOG_JPA_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CatalogDataService {

  constructor(private http:HttpClient) { }

  retriveCatalog() {
    return this.http.get<Catalog[]>(`${CATALOG_JPA_API_URL}/catalog`);
  }

  retriveItem(id) {
    return this.http.get<Catalog>(`${CATALOG_JPA_API_URL}/catalog/${id}`);
  }

  deleteItem(id) {
    return this.http.delete(`${CATALOG_JPA_API_URL}/catalog/${id}`);
  }

  updateCatalog(id,item) {
    return this.http.put(`${CATALOG_JPA_API_URL}/catalog/${id}`, item);
  }

  createCatalogItem(item) {
    return this.http.post(`${CATALOG_JPA_API_URL}/catalog`, item);
  }

}
