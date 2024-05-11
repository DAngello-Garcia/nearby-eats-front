import { Component, Input } from '@angular/core';
import { Alert } from '../../dto/clases/alert';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  @Input() alert!: Alert | null;

  public disguise() {
    this.alert = null;
  }

}
