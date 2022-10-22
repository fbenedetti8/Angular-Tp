import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  search!: string;
  @Output() onSearchChange: EventEmitter<string> = new EventEmitter();
  public productsCounter: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.cartService.getCartProducts().subscribe((resp:any) => { 
        this.productsCounter = resp.response.length; 
      },
    );
    },100) 
  }

  goToCart(value: boolean) {
    this.cartService.cartToggle(value);
  }

  onSearch() {
    this.onSearchChange.emit(this.search);
  }

}
