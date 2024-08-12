import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  private productId?: string;
  private product?: Product;
  private productCheckInterval: any;
  private productCheckSubscription?: Subscription;

  productForm = new FormGroup({
    id: new FormControl(''),
    imageUrl: new FormControl(''),
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    stock: new FormControl('', [Validators.required, Validators.min(0)])
  });

  convertToProduct(): Product {
    let product: Product = {
      id: this.productId ?? "",
      imageUrl: this.productForm.get('imageUrl')?.value ?? "",
      name: this.productForm.get('name')?.value ?? "",
      description: this.productForm.get('description')?.value ?? "",
      price: parseFloat(this.productForm.get('price')?.value ?? "0"),
      stock: parseFloat(this.productForm.get('stock')?.value ?? "0")
    };
    return product;
  }

  getProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.product = response;
        this.productForm.patchValue({
          ...this.product,
          price: this.product.price.toString(),
          stock: this.product.stock.toString()
        });
      },
      error: () => {
        console.log("This product does not exist in the API!");
        this.router.navigate([""]);
      }
    });
  }

  checkProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      error: () => {
        console.log("This product does not exist in the API!");
        this.router.navigate([""]);
      }
    });
  }

  updateProduct(): void {
    let product = this.convertToProduct();

    this.productService.updateProduct(product.id, product)
      .subscribe({
        next: () => {
          console.log("Product updated sucessfully!")
        },
        error: () => {
          console.log(`Values provided wasn't accepted by the API!`)
        }
      })
  }

  ngOnDestroy(): void {
    if (this.productCheckSubscription) {
      this.productCheckSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = id;
        this.productCheckSubscription = interval(10000).subscribe(() => {
          this.checkProduct(this.productId!);
        });
        this.getProduct(this.productId);
      } else {
        console.log("No product ID provided in the route!");
        this.router.navigate([""]);
      }
    });
  }
}
