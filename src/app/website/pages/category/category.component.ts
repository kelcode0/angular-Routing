import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {ProductsService}  from '../../../services/products.service'

import {switchMap} from 'rxjs'

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  categoryID: string | null = null;
  limit = 10
  offset =0
  products: Product[] = [];


  constructor(private router : ActivatedRoute, private getProduct : ProductsService){

  }

  ngOnInit(): void {
    // evitar anidar Subcripciones pro el callback hell mejor hacerlo con rjsx
    // this.router.paramMap.subscribe(params =>{
    //   this.categoryID= params.get('id');

    //   if (this.categoryID){
    //      this.getProduct.getByCategory(this.categoryID, this.limit, this.offset)
    //      .subscribe((data) =>{
    //       this.products = data;
    //       this.offset += this.limit;

    //      })
    //   }

    // })

    this.router.paramMap

    .pipe(
      switchMap(params => {
        this.categoryID= params.get('id');
        if (this.categoryID){
          return this.getProduct.getByCategory(this.categoryID, this.limit, this.offset)

      }
      return [];
      })
    ).subscribe((data)=>{
      this.products = data;
    })

  }

  loadMore() {
    if(this.categoryID){
    this.getProduct.getByCategory(this.categoryID, this.limit, this.offset).subscribe((data) => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
    }



}
