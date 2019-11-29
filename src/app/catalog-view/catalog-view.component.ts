import { Component, OnInit } from '@angular/core';
import { CatalogDataService } from '../service/data/catalog-data.service';
import { Router } from '@angular/router';

export class Catalog {
  constructor(
    public itemNumber: number ,
    public itemName: string,
    public amount: number,
    public inventoryCode: number
  ) {

  }
}
@Component({
  selector: 'app-catalog-view',
  templateUrl: './catalog-view.component.html',
  styleUrls: ['./catalog-view.component.css']
})
export class CatalogViewComponent implements OnInit {

  welcomeMessageFromServer:string
  message: string
  selectedItem: Catalog;
  catalog: Catalog[];
  amountMessage: string;
  withdrawNumber: number;
  depositNumber: number;


  constructor(private catalogService : CatalogDataService,
              private router: Router) { }

  ngOnInit( ) {
    this.refreshCatalog();
  }

  refreshCatalog() {
    this.catalogService.retriveCatalog().subscribe(
      responese => {
        console.log(responese);
        this.catalog=responese;
      },
      error => this.handleErrorResponse(error)
   );
  }

  addItem() {
    this.router.navigate(['catalogItem',-1])
  }


  deleteItem(id){
    this.resetMessages();
    console.log(`delete item ${id}`);
    this.catalogService.deleteItem(id).subscribe(
      response => {
        console.log(response),
        this.message = 'Delete Sucsseful !'
        this.refreshCatalog();
      }
    )
  }
  updateItem(id){
    console.log(`update item ${id}`);
    this.router.navigate(['catalogItem',id])
  }

  handleSuccsessfulResponse(responese) {
    this.welcomeMessageFromServer=responese.message;
  }

  handleErrorResponse(error){
    this.welcomeMessageFromServer=error.error.message;
  }

  deposit(itemNum) {
    this.resetMessages();
    this.catalogService.retriveItem(itemNum).subscribe(
      data => {
        this.selectedItem =data,
        this.contineDeposite(itemNum);
      }
    );
    

  }

  contineDeposite(itemNum){
    this.selectedItem.amount += this.depositNumber;
    this.catalogService.updateCatalog(itemNum,this.selectedItem).subscribe(
      data => {
       console.log(data),
       this.refreshCatalog();
      }
    ); 
  }

  withdraw(itemNum){
    this.resetMessages();
    this.catalogService.retriveItem(itemNum).subscribe(
      data =>{ 
        this.selectedItem =data,
        this.contineWithdraw(itemNum);
    }
    );
  }

  contineWithdraw(itemNum) {
    if(this.selectedItem.amount-this.withdrawNumber<0) {
      this.amountMessage = "You can withdraw up to " +this.selectedItem.amount + " items";
      return;
    }
    else {
      this.selectedItem.amount -= this.withdrawNumber;
      this.catalogService.updateCatalog(itemNum,this.selectedItem).subscribe(
        data => {
         console.log(data),
         this.refreshCatalog();
        }
      ); 

    }
  }

  resetMessages() {
    this.amountMessage = "";
    this.message = "";
  }

}
