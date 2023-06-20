import { HttpParams } from "@angular/common/http";
import { ProductService } from "./product.service";

import { of } from "rxjs";
describe("ProductService", () => {
  let service: ProductService;
  let httpClientSpy: any;
  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    service = new ProductService(httpClientSpy);
  });

  describe("business", () => {
    it("should fetch all products", () => {
      const res = "some message";
      const url = "http://127.0.0.1:8081/e-commerce/api/products";
      jest.spyOn(httpClientSpy, "get").mockReturnValue(of(res));
      service.getAllProducts();
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it("should fetch product by id", () => {
      const res = "some message";
      const url = "http://127.0.0.1:8081/e-commerce/api/products/1";
      jest.spyOn(httpClientSpy, "get").mockReturnValue(of(res));
      service.getProductById(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it("should add the product", () => {
      const data = {
        id: 1,
        name: "Mobile",
        price: 7000,
        category: "Electronics",
        stock: 5,
      };
      const res = "some message";
      const url = "http://127.0.0.1:8081/e-commerce/api/products";
      jest.spyOn(httpClientSpy, "post").mockReturnValue(of(res));
      service.addProduct(data);
      expect(httpClientSpy.post).toHaveBeenCalledWith(url, data);
    });

    it("should update the product", () => {
      const command1 = 1;
      const data = {
        id: 1,
        name: "Mobile",
        price: 7000,
        category: "Electronics",
        stock: 5,
      };

      const res = "some message";
      const url = "http://127.0.0.1:8081/e-commerce/api/products/1";
      jest.spyOn(httpClientSpy, "put").mockReturnValue(of(res));
      service.updateProduct(data);
      expect(httpClientSpy.put).toHaveBeenCalledWith(url, data);
    });

    it("should delete the product", () => {
      const command = 1;
      const res = "some message";
      const API_URL = "http://127.0.0.1:8081/e-commerce/api/products/1";
      jest.spyOn(httpClientSpy, "delete").mockReturnValue(of(res));
      service.deleteProduct(command);
      expect(httpClientSpy.delete).toHaveBeenCalledWith(API_URL);
    });

    it("should search product by price", () => {
      let params = new HttpParams();
      params = params.set("price", "100");
      const res = "some message";
      const API_URL = "http://127.0.0.1:8081/e-commerce/api/products/search";
      jest.spyOn(httpClientSpy, "get").mockReturnValue(of(res));
      service.searchProducts("", 100, "");
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL, { params });
    });

    it("should search product by name", () => {
      let params = new HttpParams();
      params = params.set("name", "Mobile");
      const res = "some message";
      const API_URL = "http://127.0.0.1:8081/e-commerce/api/products/search";
      jest.spyOn(httpClientSpy, "get").mockReturnValue(of(res));
      service.searchProducts("Mobile", 0, "");
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL, { params });
    });

    it("should search product by category", () => {
      let params = new HttpParams();
      params = params.set("category", "Electronics");
      const res = "some message";
      const API_URL = "http://127.0.0.1:8081/e-commerce/api/products";
      jest.spyOn(httpClientSpy, "get").mockReturnValue(of(res));
      service.searchProducts("", 0, "Electronics");
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL + "/search", {
        params,
      });
    });
  });
});
