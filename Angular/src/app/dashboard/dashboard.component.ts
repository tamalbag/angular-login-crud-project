import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private products: Product[];
  public searchText: string;
  p: number = 1;
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this.productService.getProduct().subscribe(
      data => {
        console.log(data);
        this.products = data["msg"];
      },

      error => {
        console.log(error);
      }
    )
  }
  doEdit(id) {

    this.router.navigate(['/updateProduct', id]);
  }
  doDelete(id) {
    this.productService.deleteProduct(id).subscribe(
      data => {
        this.products.splice(this.products.indexOf(id), 1);
        this.getProduct();
      },
      error => {

      }
    )
  }



}
