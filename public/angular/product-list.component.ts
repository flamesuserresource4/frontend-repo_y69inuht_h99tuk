import { Component, Input, OnChanges } from '@angular/core';

export interface Product {
  id?: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  ingredients: string[];
  image_url?: string;
  popularity?: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnChanges {
  @Input() query = '';

  filters = { category: '', ingredient: '', sort: 'popularity_desc', min_price: undefined as number | undefined, max_price: undefined as number | undefined };
  items: Product[] = [];
  categories: string[] = [];
  ingredients: string[] = [];

  async fetch() {
    const base = (window as any).VITE_BACKEND_URL || location.origin.replace(/:\\d+$/, '') + ':8000';
    const qs = new URLSearchParams();
    if (this.query) qs.set('q', this.query);
    if (this.filters.category) qs.set('category', this.filters.category);
    if (this.filters.ingredient) qs.set('ingredient', this.filters.ingredient);
    if (this.filters.min_price != null) qs.set('min_price', String(this.filters.min_price));
    if (this.filters.max_price != null) qs.set('max_price', String(this.filters.max_price));
    if (this.filters.sort) qs.set('sort', this.filters.sort);
    const res = await fetch(`${base}/api/products?${qs.toString()}`);
    this.items = await res.json();
    this.categories = Array.from(new Set(this.items.map(i => i.category)));
    this.ingredients = Array.from(new Set(this.items.flatMap(i => i.ingredients || [])));
  }

  ngOnChanges(): void {
    this.fetch();
  }
}
