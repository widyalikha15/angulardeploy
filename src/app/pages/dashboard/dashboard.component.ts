import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @Output() newTaskEvent =  new EventEmitter<boolean>();

  constructor(public service: PaymentService, private modalService: NgbModal) { }

  form = {
    inputData: new FormGroup({
      cardOwnerName: new FormControl('', [Validators.required]),
      cardNumber: new FormControl('', [Validators.required, Validators.maxLength(16)]),
      expirationDate: new FormControl('', [Validators.required]),
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
    return (this.form.inputData.get('cardOwnerName'));
  }
  get cardNumber(){
    return (this.form.inputData.get('cardNumber'));
  }
  get expirationDate(){
    return (this.form.inputData.get('expirationDate'));
  }
  get securityCode(){
    return (this.form.inputData.get('securityCode'));
  }

  addPayment(){
    this.service.addPayment(this.form.inputData.value).subscribe((res) => {
      alert('Payment Berhasil Ditambahkan');
      this.form.inputData.reset();
      this.newTaskEvent.emit(true);
    },
    (err) => {
      alert('Something Went Wrong');
    });
  }

  open(content: any) {
    this.modalService.open(content, { size: 'xl' });
  }

}
