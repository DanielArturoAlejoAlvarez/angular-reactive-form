import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactCollection: AngularFirestoreCollection<Contact>;

  constructor(private _af: AngularFirestore) { 
    this.contactCollection = _af.collection<Contact>('contacts');
  }

  savedMessage(newContact: Contact): void{
    this.contactCollection.add(newContact);
  }
}
