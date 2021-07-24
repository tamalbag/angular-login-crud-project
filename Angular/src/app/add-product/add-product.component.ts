import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { Product } from '../shared/product';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  private product: Product;
  userDetails;
  form!: FormGroup;
  username: any;

  constructor(private userService: UserService, private ProductService: ProductService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.product = this.ProductService.getter();

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.username = this.userDetails.fullName;

      },
      err => {
        console.log(err);

      }
    );

    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      add_by_user: ['', Validators.required],

    }, formOptions);
  }

  createOrUpdate() {
    this.ProductService.createProduct(this.form.value).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    )
  }


}
