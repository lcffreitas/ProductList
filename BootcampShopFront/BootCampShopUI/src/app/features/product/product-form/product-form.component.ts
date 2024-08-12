import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductDTO } from '../../models/productDTO.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm = new FormGroup({
    imageUrl: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    stock: new FormControl('', [Validators.required, Validators.min(0)])
  });

  constructor(private productService: ProductService) {}

  convertToProduct(): ProductDTO {
    let product: ProductDTO = {
      imageUrl: this.productForm.get('imageUrl')?.value ?? "",
      name: this.productForm.get('name')?.value ?? "",
      description: this.productForm.get('description')?.value ?? "",
      price: parseFloat(this.productForm.get('price')?.value ?? "0"),
      stock: parseFloat(this.productForm.get('stock')?.value ?? "0")
    };
    return product;
  }

  addProduct() : void {
    let product = this.convertToProduct();

    this.productService.addProduct(product)
    .subscribe({
      next: (response) => {
        console.log("Product added sucessfully!");
      },
      error: (response) => {
        const errorMessage = JSON.stringify(response.error) || response.message || 'Unknown Error.';
        alert(`${errorMessage}`)
        console.log(`You provided values that will not be accepted by the API!`);
        console.log(product);
      }
    })
  }
}
