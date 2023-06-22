import { HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductService } from './product.service';
describe('ProductService', () => {
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

  describe('business', () => {
    it('service should be created', () => {
      expect(service).toBeTruthy(); 
     });



    it('should get all products by calling getAllProducts() in service', () => {
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/e-commerce/api/products';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res)); 
      service.getAllProducts();
      expect(httpClientSpy.get).toHaveBeenCalledWith(url); 
    });

    it('should get a product calling getProductById() in service', () => {
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/e-commerce/api/products/1';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res)); 
      service.getProductById(1); 
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    });

    it('should add the product calling addProduct() in service', () => {
      const data = {
        id: 1,
        name: 'Mobile',
        price: 7000,
        category: 'Electronics',
        stock: 5
      };
      const res = 'some message';
      const url = 'http://127.0.0.1:8081/e-commerce/api/products';
      jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(res));
      service.addProduct(data);
      expect(httpClientSpy.post).toHaveBeenCalledWith(url, data);
    });
    

    it('should update the product calling updateProduct() in service', () => {
      const command1 = 1;
      const data = {
        id: 1,
        name: 'Mobile',
        price: 7000,
        category: 'Electronics',
        stock: 5
      };

      const res = 'some message';
      const url = 'http://127.0.0.1:8081/e-commerce/api/products/1';
      jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(res));
      service.updateProduct(data);
      expect(httpClientSpy.put).toHaveBeenCalledWith(url, data);
    });

    it('should delete the product calling deleteProduct() in service', () => {
      const command = 1;
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/e-commerce/api/products/1';
      jest.spyOn(httpClientSpy, 'delete').mockReturnValue(of(res));
      service.deleteProduct(command);
      expect(httpClientSpy.delete).toHaveBeenCalledWith(API_URL);
    });

    it('should search the product with price by calling searchProducts() in service', () => {
      let params = new HttpParams();
      params = params.set('price', '100');
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/e-commerce/api/products/search';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      service.searchProducts('', 100, '');
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL, { params });
    });

    it('should search the product with name by calling searchProducts() in service', () => {
      let params = new HttpParams();
      params = params.set('name', 'Mobile');
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/e-commerce/api/products/search';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      service.searchProducts('Mobile', 0, '');
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL, { params });
    });

    it('should search the product with category by calling searchProducts() in service', () => {
      let params = new HttpParams();
      params = params.set('category', 'Electronics');
      const res = 'some message';
      const API_URL = 'http://127.0.0.1:8081/e-commerce/api/products';
      jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      service.searchProducts('', 0, 'Electronics');
      expect(httpClientSpy.get).toHaveBeenCalledWith(API_URL + '/search', { params });
    });

  });
});
