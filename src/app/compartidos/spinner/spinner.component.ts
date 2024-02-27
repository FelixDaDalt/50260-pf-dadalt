import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {

  spinner$?:Observable<boolean>

  constructor(private spinnerService:SpinnerService){
    this.spinner$ = this.spinnerService.spinnerActive$
  }
}
