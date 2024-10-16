import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) {

   }
   addCart(model:any){
    return this.http.post('https://fakestoreapi.com/'+ 'carts',model)
  }
  }
