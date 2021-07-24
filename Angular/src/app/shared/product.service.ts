import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from './product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private product: Product;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  createProduct(product: Product) {
    return this.http.post(environment.apiBaseUrl + '/CreateCrud', product, { headers: this.headers });
  }
  getProduct() {
    return this.http.get(environment.apiBaseUrl + '/getCrud');
  }
  getProductInfo(id: string) {
    return this.http.get(environment.apiBaseUrl + '/crudInfo/' + id, { headers: this.headers });
  }
  updateProduct(id: string, product: Product) {
    return this.http.put(environment.apiBaseUrl + '/updateCrud/' + id, product, { headers: this.headers });
  }
  deleteProduct(id: string) {
    return this.http.delete(environment.apiBaseUrl + '/deleteCrud/' + id, { headers: this.headers });
  }
  setter(product: Product) {
    this.product = product;
  }
  getter() {
    return this.product;
  }

}
