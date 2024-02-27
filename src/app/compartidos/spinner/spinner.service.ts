import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private spinnerActiveSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spinnerActive$: Observable<boolean> = this.spinnerActiveSubject.asObservable();

  constructor() { }

  show() {
    this.spinnerActiveSubject.next(true);
  }

  hide() {
    this.spinnerActiveSubject.next(false);
  }

  error(){

  }
}
