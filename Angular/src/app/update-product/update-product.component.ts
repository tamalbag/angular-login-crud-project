import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from '../shared/product';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  isAddMode!: boolean;
  id!: string;
  private product: Product;
  userDetails;
  form!: FormGroup;
  name: any;
  price: any;
  description: any;
  add_by_user: any;
  constructor(private userService: UserService, private ProductService: ProductService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.isAddMode = !this.id;
    this.product = this.ProductService.getter();

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
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

    this.ProductService.getProductInfo(this.id).subscribe(
      data => {
        console.log(data);
        this.name = data.name;
        this.price = data.price;
        this.description = data.description;
        this.add_by_user = data.add_by_user;
        this.form.controls.name.setValue(data.name)
        this.form.controls.price.setValue(data.price)
        this.form.controls.description.setValue(data.description)
        this.form.controls.add_by_user.setValue(data.add_by_user)
        console.log(this.name)
        console.log(this.price)
        console.log(this.description)
        console.log(this.add_by_user)
      },
      error => {
        console.log(error);
      }

    )

  }
  UpdateProduct() {
    this.ProductService.updateProduct(this.id, this.form.value).subscribe(
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