import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { of } from 'rxjs';
import { ProductoModel } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pymesbackend.azurewebsites.net/api/productos';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }
  post(obj: ProductoModel) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}