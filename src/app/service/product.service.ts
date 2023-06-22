import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../model/product";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "";

  constructor(private http: HttpClient) {}

  getAllProducts() {
    //Write your logic here
    return null;
  }

  getProductById(id: number) {
    //Write your logic here
    return null;
  }

  addProduct(product: Product) {
    //Write your logic here
    return null;
  }

  updateProduct(product: Product) {
    //Write your logic here
    return null;
  }

  deleteProduct(id: number) {
    //Write your logic here
    return null;
  }

  searchProducts(name: string, price: number, category: string) {
    //Write your logic here
    return null;
  }
}
