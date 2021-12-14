import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payments: Payment[] = [];
  currentPayment: Payment= new Payment();
  closeResult = '';

  constructor(public service: PaymentService, private modalService: NgbModal) { }
  
  getPayments(){
    this.service.getPayments().subscribe(dataSource => this.payments = dataSource as Payment[]);
  };

  form = {
    updateData: new FormGroup({
      cardOwnerName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      expirationDate: new FormControl('', [Validators.required]),
      //securityCode: new FormControl('', [Validators.required, Validators.email])
      securityCode: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl!.errors && !checkControl!.errors.matching) {
        return null;
      }

      if (control!.value !== checkControl!.value) {
        controls.get(checkControlName)!.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  get cardOwnerName(){
    return (this.form.updateData.get('cardOwnerName'));
  }
  get cardNumber(){
    return (this.form.updateData.get('cardNumber'));
  }
  get expirationDate(){
    return (this.form.updateData.get('expirationDate'));
  }
  get securityCode(){
    return (this.form.updateData.get('securityCode'));
  }

  ngOnInit(): void {
    this.getPayments();
  }

  refreshList() {
    this.getPayments()
  }

  updatePayment(){
    this.service.updatePayment(this.form.updateData.value, this.currentPayment.id).subscribe((res) => {
      alert('Payment Berhasil Terupdate');
      this.getPayments();
    });
  }

  /* deletePayment(){
    this.service.deletePayment(this.currentPayment.id).subscribe((res) => {
      alert('Payment Berhasil Terhapus');
      this.getPayments();
    });  
  } */
  deletePayment(id: number){    
    this.service.deletePayment(id).subscribe((res) => {
       this.getPayments();
       alert('Payment Berhasil Terhapus');
       //this.toastr.warning('Delete Successfully', 'Manage Payment');
       //this.router.navigate(['payment']);
       this.modalService.dismissAll();
    }
    );
  }

  open(content: any, payment: Payment) {
    this.modalService.open(content, { size: 'xl' });

    this.form.updateData.patchValue({
      cardOwnerName : payment.cardOwnerName,
      cardNumber: payment.cardNumber,
      expirationDate: payment.expirationDate,
      securityCode: payment.securityCode
     });

    this.currentPayment = payment ;
  }

}
