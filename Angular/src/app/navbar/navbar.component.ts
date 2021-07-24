import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ProductService } from '../shared/product.service';
import { Router } from "@angular/router";
import { Product } from '../shared/product';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userDetails;
  constructor(private userService: UserService, private ProductService: ProductService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
  }
  newProduct(event: any) {
    event.preventDefault();
    this.ProductService.setter(new Product());
  }
  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }



}
