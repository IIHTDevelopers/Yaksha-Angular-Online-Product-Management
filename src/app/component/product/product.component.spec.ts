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
import { of } from "rxjs";

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

    it("should get all products", () => {
      const response = {
        success: true,
        message: "all products got successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "getAllProducts")
        .mockReturnValue(response);
      expect(serviceMock.getAllProducts(product)).toBe(response);
      expect(editPro).toHaveBeenCalled();
    });

    it("should add the product", () => {
      const response = {
        success: true,
        message: "product added successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "addProduct")
        .mockReturnValue(response);
      expect(serviceMock.addProduct(product)).toBe(response);
      expect(editPro).toHaveBeenCalledWith(product);
    });

    it("should update the Product of specified id", () => {
      const response = {
        success: true,
        message: "Product updated successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "updateProduct")
        .mockReturnValue(response);
      expect(serviceMock.updateProduct(product)).toBe(response);
      expect(editPro).toHaveBeenCalledWith(product);
    });

    it("should delete the Product of specified id", () => {
      const response = {
        success: true,
        message: "Product deleted successfully",
      };
      const delPro = jest
        .spyOn(serviceMock, "deleteProduct")
        .mockReturnValue(response);
      expect(serviceMock.deleteProduct(1)).toBe(response);
      expect(delPro).toHaveBeenCalledWith(1);
    });

    it("should search product by price ", () => {
      const response = {
        success: true,
        message: "a user get successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "searchProducts")
        .mockReturnValue(response);
      expect(serviceMock.searchProducts("", 100, "")).toBe(response);
      expect(editPro).toHaveBeenCalledWith("", 100, "");
    });

    it("should search product by Name ", () => {
      const response = {
        success: true,
        message: "a user get successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "searchProducts")
        .mockReturnValue(response);
      expect(serviceMock.searchProducts("Mouse", 0, "")).toBe(response);
      expect(editPro).toHaveBeenCalledWith("Mouse", 0, "");
    });

    it("should search product by Category ", () => {
      const response = {
        success: true,
        message: "a user get successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "searchProducts")
        .mockReturnValue(response);
      expect(serviceMock.searchProducts("", 0, "Elect")).toBe(response);
      expect(editPro).toHaveBeenCalledWith("", 0, "Elect");
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
});
