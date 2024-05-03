import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import e from 'express';

@Component({
  selector: 'app-email-recuperacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './email-recuperacion.component.html',
  styleUrl: './email-recuperacion.component.css'
})
export class EmailRecuperacionComponent {

  email: string = "";
  loading: boolean = false;


  constructor() {
  }

  public sendEmail() {
    console.log(this.email);
  }

}
