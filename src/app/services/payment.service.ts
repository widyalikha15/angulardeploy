import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  //endpoint = 'http://localhost:4000/users'
  //endpoint = 'https://localhost:5001/api/Payment'
  endpoint = 'https://paymentappwidya.herokuapp.com/api/Payment'
  payment: Payment [] = [];
  
  constructor(private http: HttpClient) { }

  addPayment(payment: Payment){
    let api = `${this.endpoint}`;
    return (this.http.post(api, payment).pipe(catchError(this.handleError)));
  }

  updatePayment(payment: Payment, id: number){
    let api = `${this.endpoint}/${id}`;
    payment.id = id;//tambahin ini
    return (this.http.put(api, payment).pipe(catchError(this.handleError)));
  }

  getPayments (): Observable<any> {
    const api = `${this.endpoint}`

    return this.http.get(api)
    .pipe( catchError(this.handleError) )
  }

  deletePayment(id: number){
    let api = `${this.endpoint}/${id}`;
    
    return (this.http.delete(api).pipe(catchError(this.handleError)))
  }



  handleError(error: HttpErrorResponse){
    let msg = '';
    if(error.error instanceof ErrorEvent){
      msg = error.error.message;
    }else{
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return (throwError(msg));
  }
}
