import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loading: boolean = false;
  cartItems: any;
  totalPrice: any;
  wellDone: boolean = false;
  constructor(private serv: CartService) {
    if ("cart" in localStorage) {
      this.cartItems = JSON.parse(localStorage.getItem("cart")!);
      console.log(this.cartItems);
    }
    this.calculate()

  }

  ngOnInit(): void {
  }
  calculate() {
    this.totalPrice = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.totalPrice += this.cartItems[i].item.price * this.cartItems[i].quantity;
    }
  }


  clearCart() {
    this.cartItems = [];
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    // this.totalPrice=0;
    this.calculate()

  }
  onDelete(element: any) {
    let id = this.cartItems.indexOf(element);
    this.cartItems.splice(id, 1);
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.calculate()
  }

  minus(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
      this.calculate()
    }
  }
  plus(index: number) {
    this.cartItems[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.calculate();
  }

  updateQuantity(event: any, index: number) {
    this.cartItems[index].quantity = event.target.value;
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    this.calculate()
  }


  orderNow() {
 let addMy=this.cartItems.map((item:any) =>{
  return {productId:item.item.id ,quantity:item.quantity}
 })
    let model = {
      "userId": 5,
      "date": new Date(),
      "products":addMy
    }
    this.serv.addCart(model).subscribe((data: any) => {
      this.wellDone = true;
      

    })
  }
}
