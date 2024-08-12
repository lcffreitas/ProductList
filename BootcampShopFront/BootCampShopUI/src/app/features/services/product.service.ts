import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductDTO } from '../models/productDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "https://localhost:7201";
  private api: string = "api/product";

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/${this.api}`);
  }
  getProductById(id: string) : Observable<Product> {
    return this.http.get<Product>(`${this.url}/${this.api}/${id}`);
  }
  addProduct(product: ProductDTO) : Observable<void> {
    return this.http.post<void>(`${this.url}/${this.api}`, product);
  }
  updateProduct(id: string, product: Product) : Observable<void> {
    return this.http.put<void>(`${this.url}/${this.api}/${id}`, product);
  }
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${this.api}/${id}`);
  }
}
