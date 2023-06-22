import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductComponent } from "./product.component";
import { ProductService } from "../../service/product.service";
import { HttpClientModule } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { Product } from "src/app/model/product";
import { of } from 'rxjs';

describe("ProductComponent", () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let serviceMock: any;
  let productService: ProductService;
  const product: Product = {
    id: 1,
    name: "Mouse",
    price: 500,
    category: "Elect",
    stock: 5,
  };

  let mockService = {
    getAllProducts: () => {
      return of([product]);
    },
    getProductById: () => {
      return of([product]);
    },
    deleteProduct: (id: number | string) => {
      return of(product);
    },
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        ProductService,
        HttpTestingController,
        { provide: ProductService, useValue: mockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    serviceMock = {
      getAllProducts: jest.fn(),
      addProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      searchProducts: jest.fn(),
    };

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  describe("business", () => {
    it("should create the component", () => {
      expect(component).toBeTruthy();
    });

    it("should declare obj refereces", () => {
      expect(component.productForm).toBeDefined();
    });

    it("should initialize the form", () => {
      const productForm = {
        id: "",
        name: "",
        price: "",
        category: "",
        stock: "",
      };
      expect(component.productForm.value).toEqual(productForm);
    });

    it("should validate the name field in the form", () => {
      const c = component.productForm.controls["name"];
      c.setValue("Venu");
      expect(c.valid).toBeTruthy();
      c.setValue("");
      expect(c.invalid).toBeTruthy();
      c.setValue("Ve");
      expect(c.invalid).toBeTruthy();
    });

    it("should validate the price field in the form", () => {
      const c = component.productForm.controls["price"];
      c.setValue(500);
      expect(c.valid).toBeTruthy();
      c.setValue("");
      expect(c.invalid).toBeTruthy();
      c.setValue(-200);
      expect(c.invalid).toBeTruthy();
    });

    it("should validate the category field in the form", () => {
      const c = component.productForm.controls["category"];
      c.setValue("Electronics");
      expect(c.valid).toBeTruthy();
      c.setValue("");
      expect(c.invalid).toBeTruthy();
    });

    it("should validate the stock field in the form", () => {
      const c = component.productForm.controls["stock"];
      c.setValue(50);
      expect(c.valid).toBeTruthy();
      c.setValue("");
      expect(c.invalid).toBeTruthy();
      c.setValue(-2);
      expect(c.invalid).toBeTruthy();
    });
  });

  describe("boundary", () => {
    it("should invalidate the form when name length is greater than 20", () => {
      const form = component.productForm;
      form.controls["name"].setValue(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      );
      expect(form.invalid).toBeTruthy();
      expect(form.controls["name"].errors?.["maxlength"]).toBeTruthy();
    });

    it("should invalidate the form when name length is less than 3", () => {
      const form = component.productForm;
      form.controls["name"].setValue("Pr");
      expect(form.invalid).toBeTruthy();
      expect(form.controls["name"].errors?.["minlength"]).toBeTruthy();
    });

    it("should invalidate the form when price is greater than 9999", () => {
      const form = component.productForm;
      form.controls["price"].setValue(18000);
      expect(form.invalid).toBeTruthy();
      expect(form.controls["price"].errors?.["max"]).toBeTruthy();
    });

    it("should invalidate the form when stock is greater than 1000", () => {
      const form = component.productForm;
      form.controls["stock"].setValue(1500);
      expect(form.invalid).toBeTruthy();
      expect(form.controls["stock"].errors?.["max"]).toBeTruthy();
    });

    it("should validate the form on valid values to all fields", () => {
      component.productForm.controls["id"].setValue("1");
      component.productForm.controls["name"].setValue("Mouse");
      component.productForm.controls["price"].setValue("500");
      component.productForm.controls["category"].setValue("Electronics");
      component.productForm.controls["stock"].setValue("5");
      expect(component.productForm.valid).toBeTruthy();
    });

    it("should disable the submit button when the form is invalid", () => {
      const form = component.productForm;
      form.controls["name"].setValue("");
      form.controls["price"].setValue(-10);
      form.controls["category"].setValue("");
      form.controls["stock"].setValue(-5);
      fixture.detectChanges();
      const submitButton = fixture.nativeElement.querySelector(
        'button[type="submit"]'
      );
      expect(submitButton.disabled).toBe(true);
    });

    it("should enable the submit button when the form is valid", () => {
      const form = component.productForm;
      form.controls["name"].setValue("Product 1");
      form.controls["price"].setValue(99.99);
      form.controls["category"].setValue("Electronics");
      form.controls["stock"].setValue(500);
      fixture.detectChanges();

      const submitButton = fixture.nativeElement.querySelector(
        'button[type="submit"]'
      );
      expect(submitButton.disabled).toBe(false);
    });
    
  });

  describe("exception", () => {
    it("should invalidate the form when empty", () => {
      component.productForm.controls["id"].setValue("");
      component.productForm.controls["name"].setValue("");
      component.productForm.controls["price"].setValue("");
      component.productForm.controls["category"].setValue("");
      component.productForm.controls["stock"].setValue("");
      expect(component.productForm.valid).toBeFalsy();
    });

    it("name field should show required error when no value passed", () => {
      const c = component.productForm.controls["name"];
      expect(c.valid).toBeFalsy();
      c.setValue("");
      expect(c.hasError("required")).toBeTruthy();
    });

    it("price field should show required error when no value passed", () => {
      const c = component.productForm.controls["price"];
      expect(c.valid).toBeFalsy();
      c.setValue("");
      expect(c.hasError("required")).toBeTruthy();
    });

    it("category field should show required error when no value passed", () => {
      const c = component.productForm.controls["category"];
      expect(c.valid).toBeFalsy();
      c.setValue("");
      expect(c.hasError("required")).toBeTruthy();
    });

    it("stock field should show required error when no value passed", () => {
      const c = component.productForm.controls["stock"];
      expect(c.valid).toBeFalsy();
      c.setValue("");
      expect(c.hasError("required")).toBeTruthy();
    });
  });

  describe("business", ()=>{
    it('should fetch all products', ()=>{    
      component.products=[];
      jest.spyOn(mockService, 'getAllProducts').mockReturnValue(of([product]));
      component.getAllProducts();        
      //expect(mockService.getAllProducts).toBeCalledTimes(1);
      expect(component.products.length).toBeGreaterThan(0);    
      expect(Array.isArray(component.products)).toBe(true);
    })    
  });

  it('should delete product by id', ()=>{  
    jest.spyOn(mockService, 'deleteProduct').mockReturnValue(of(product));
    component.deleteProduct(1);      
    expect(mockService.deleteProduct).toBeCalledTimes(1);
    expect(mockService.deleteProduct).toBeCalledWith(1);
  })

  it('should get product  by id', ()=>{  
    jest.spyOn(mockService, 'getProductById')
    component.getProductById(1);      
    expect(mockService.getProductById).toBeCalledTimes(1);
    expect(mockService.getProductById).toBeCalledWith(1);
  })

});






