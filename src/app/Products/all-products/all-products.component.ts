import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allData: any[] = [];
  allCategories: any[] = [];
  isLoading: boolean = false;
  cartItems: any[] = [];
  itemDetails:any;
  constructor(private serv: ProductService ,private router:Router) {

  }

  ngOnInit(): void {
    this.get();
    this.getcategories();
  }
  get() {
    this.isLoading = true;
    this.serv.getAllProducts().subscribe((data: any) => {
      this.allData = data;
      this.isLoading = false;
      // console.log(this.allData);
    }, (error: any) => {
      alert("error")
      this.isLoading = false;

    })
  }
  getcategories() {
    this.isLoading = true;

    this.serv.getcategories().subscribe((data: any) => {
      // console.log(data);
      this.allCategories = data;
      this.isLoading = false;

    }, (error: any) => {
      alert("error from categories")
      this.isLoading = false;

    })
  }

  getSpecificCategory(event: any) {
    let value = event.target.value;
    this.isLoading = true;

    console.log(value);
    if (value == "All") {
      this.get();
      this.isLoading = false;

    } else {
      this.isLoading = true;

      this.serv.getSpecificCategory(value).subscribe((data: any) => {
        this.allData = data;
        this.isLoading = false;

      })
    }

  }


  addtoCart(event: any) {
    if ("cart" in localStorage) {
      this.cartItems = JSON.parse(localStorage.getItem("cart")!);
      let exist=this.cartItems.find(item=> item.item.id==event.item.id);
      if(exist){
        alert('already exist')
        this.cartItems.find(item=> item.item.id==event.item.id).quantity=event.quantity
        localStorage.setItem("cart", JSON.stringify(this.cartItems))
      }else{
        this.cartItems.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartItems))
      }

    } else {
      this.cartItems.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    }
    // console.log(event)
  }


}
