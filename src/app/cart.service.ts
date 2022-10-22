import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public inCart = false;
  public search!: string;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get('http://c1300044.ferozo.com/getListado.php');
  }

  getCartProducts() {
    return this.http.get(`http://c1300044.ferozo.com/getListadoCarrito.php`);
  }

  addProduct(plan:string, period: number) {
    return this.http.get(`http://c1300044.ferozo.com/agregarItem.php?plan=${plan}&periodo=${period}`);
  }

  removeProduct(id: number) {
    return this.http.get(`http://c1300044.ferozo.com/removerItem.php?id_producto=${id}`);
  }
  
  cartToggle(value: boolean) {
    this.inCart = value;
    this.getCartProducts();
    this.change.emit(this.inCart)
  }

}


