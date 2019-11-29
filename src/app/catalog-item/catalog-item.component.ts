import { Component, OnInit } from '@angular/core';
import { CatalogDataService } from '../service/data/catalog-data.service';
import { Catalog } from '../catalog-view/catalog-view.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {

  id: number;
  catalogItem: Catalog;
  catalog: Catalog[];
  message: string;


  constructor(private catalogService:CatalogDataService,
              private route: ActivatedRoute ,
              private router: Router         
    ) { }

  ngOnInit() {
    this.id= this.route.snapshot.params['id'];
    this.catalogItem = new Catalog(this.id,"",0,0);
    if(this.id!= -1) {
      this.catalogService.retriveItem(this.id).subscribe(
        data => this.catalogItem =data

      );
    }
    this.catalogService.retriveCatalog().subscribe(
      responese => this.catalog =responese
    );
  }

  saveItem() {
    if(this.id == -1){
      this.catalogService.createCatalogItem(this.catalogItem).subscribe(
        data =>{
          console.log(data),
          this.router.navigate([''])
        }
      )
    }
    else {
      this.catalogService.updateCatalog(this.id,this.catalogItem).subscribe(
        data => {
         console.log(data),
          this.router.navigate([''])
        }
      ); 
    }
  }

  checkItemInventoryCode() {
    this.message="";
    if(this.catalogItem.itemNumber != -1)
      return true;
    for(let key in this.catalog ) {
      let value = this.catalog[key].inventoryCode;
      if(value == this.catalogItem.inventoryCode)
      {
        this.message = "Inventory Code is Taken";
        return false;
      } 
    }
    return true;
  }
}
