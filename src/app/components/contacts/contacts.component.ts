import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../services/contact.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, state, style, trigger, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'contactForm',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  animations: [
    trigger('aniBtn', [
      state('inactive', style({
        backgroundColor: '#F20732',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#F20505',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', [
        animate(500, keyframes([
          style({backgroundColor: '#F20732', offset: 0}),
          style({backgroundColor: '#07038C', offset: 0.5}),
          style({backgroundColor: '#F20505', offset: 1}),
        ]))
      ]),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class ContactsComponent implements OnInit {

  year: number = new Date().getFullYear();

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  createFormGroup(){
    return new FormGroup({
      displayName: new FormControl('',[Validators.required, Validators.minLength(5)]),
      email: new FormControl('',[Validators.required, Validators.minLength(8), Validators.pattern(this.emailPattern)]),
      msg: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(144)])
    });
  }

  contactForm: FormGroup;
  public state: string = 'inactive';

  constructor(private _cs: ContactService, private _ts: ToastrService) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit() {
   
  }

  btnToggle(){
    this.state = this.state === 'active' ? 'inactive' : 'active';
    setTimeout(() => {
      this.state = 'inactive';
    }, 500);
  }

  onResetForm(){
    this.contactForm.reset();
  }

  onSaveForm(){
    console.log(this.contactForm.value);
    if(this.contactForm.valid){
      console.log('Is valid!');
      this._cs.savedMessage(this.contactForm.value);
      this.onResetForm();
      this._ts.success('Thank you for your message, we will contact you. promptly', 'Success:');
    }else{
      console.log('Not valid!');
      this._ts.error('It seems that something went wrong, try again','ERROR:')
    }
  }

  
  get displayName(){    
    return this.contactForm.get('displayName');
  }

  get email(){
    return this.contactForm.get('email');
  }

  get msg(){
    return this.contactForm.get('msg');
  }


}
