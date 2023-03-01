import { Component, OnInit } from '@angular/core';
import{Location}from '@angular/common'
import {ActivatedRoute} from '@angular/router'
import{switchMap} from 'rxjs'

import{ProductsService}from '../../../services/products.service'

import {Product}from '../../../models/product.model'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit{

  productId: string|null =null;



  product: Product| null =null;

  constructor(private router:ActivatedRoute, private        getProduct: ProductsService,
    private loction:Location){

  }

  ngOnInit(): void {
     this.router.paramMap

    .pipe(
      switchMap(params => {
        this.productId= params.get('id');
        if (this.productId){
          return this.getProduct.getOne(this.productId)

      }
      return [null];
      })
    ).subscribe((data)=>{
      this.product = data;
    })

  }

  goBack(){
    this.loction.back();
  }

}
