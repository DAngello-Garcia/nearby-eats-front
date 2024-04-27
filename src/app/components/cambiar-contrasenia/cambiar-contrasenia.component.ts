import { Component } from '@angular/core';
import { UserChangePasswordDTO } from '../../dto/user-change-password-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-contrasenia',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrl: './cambiar-contrasenia.component.css'
})
export class CambiarContraseniaComponent {

  userChangePassword: UserChangePasswordDTO

  constructor() {
    this.userChangePassword = new UserChangePasswordDTO();
  }

  public changePassword() {
    console.log(this.userChangePassword);
  }

  public theAreEqual(): boolean {
    return this.userChangePassword.newPassword == 
    this.userChangePassword.confirmPassword;
  }
}
