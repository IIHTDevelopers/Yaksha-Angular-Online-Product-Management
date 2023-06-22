import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Product } from "../../model/product";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  products!: Product[] ;
  constructor() {}

  ngOnInit(): void {

    // write your logic here
  }

  getAllProducts(): void {
    // write your logic here
  }

  getProductById(id: number): void {
    // write your logic here
  }

  addProduct(): void {
    // write your logic here
  }

  edit(prod: any) {
    // write your logic here
  }

  updateProduct(product: Product): void {
    // write your logic here
  }

  deleteProduct(id: number): void {
    // write your logic here
  }

  searchProducts(): void {
    // write your logic here
  }
}
