import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  constructor(private productService : ProductService, private router: Router){
    this.loadProducts();
  }

  products?: Product[];

  loadProducts(){
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    })
  }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe({
      next: (response) => {
        this.products = response;
      }
    })
  }
  deleteProduct(id: string){
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    })
  }
  editProduct(productId: string): void {
    this.router.navigate(['admin/product/update',{ id: productId }]);
  }
}
