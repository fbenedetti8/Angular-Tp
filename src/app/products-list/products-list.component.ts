import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnChanges {
  @Input() search!: string;
  private allProducts: any;
  public products: any;
  public productsColumns = [
    'Nombre',
    'Periodo 12',
    'Periodo 24',
    'Periodo 36',
    'Acciones',
  ];
  public productsCartColumns = ['Id', 'Nombre', 'Periodo', 'Valor', 'Acciones'];
  public period: number = 12;
  public isCart: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.change.subscribe((resp) => {
      this.isCart = resp;
      this.getCartProducts();
    });

    if (!this.isCart) {
      this.cartService.getProducts().subscribe((resp: any) => {
        this.allProducts = resp.response.planes;
        this.products = resp.response.planes;
      });
    } else {
      this.getCartProducts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.products = this.allProducts?.filter((e: any) =>
      e.nombre.toUpperCase().includes(this.search.toUpperCase())
    );
  }

  getCartProducts() {
    this.productsColumns = this.productsCartColumns;
    this.cartService.getCartProducts().subscribe((resp: any) => {
      this.allProducts = resp.response;
      this.products = resp.response;
    });
  }

  onCheckPeriod(e: any) {
    if (e.target.checked) {
      this.period = e.target.value;
    }
  }

  addToCart(plan: string) {
    this.cartService
      .addProduct(plan, this.period)
      .subscribe();
  }

  removeToCart(id: number) {
    this.cartService.removeProduct(id).subscribe(() => this.ngOnInit());
  }
}

