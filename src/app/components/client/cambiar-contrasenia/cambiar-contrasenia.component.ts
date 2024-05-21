import { Component } from '@angular/core';
import { UserChangePasswordDTO } from '../../../dto/user/user-change-password-dto';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../services/token.service';
import { UserService } from '../../../services/user.service';
import { UserServiceService } from '../../../services/controllers/user-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cambiar-contrasenia',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrl: './cambiar-contrasenia.component.css'
})
export class CambiarContraseniaComponent {

  userChangePasswordDTO: UserChangePasswordDTO

  constructor(
    private tokenService: TokenService,
    private userService: UserServiceService,
    private route: ActivatedRoute) {

    this.userChangePasswordDTO = new UserChangePasswordDTO();
    this.route.params.subscribe((params) => {
      this.userChangePasswordDTO.recoveryToken = params['tokenemail'];
      this.tokenService.setToken(this.userChangePasswordDTO.recoveryToken);
    });
  }

  public changePassword() {
    this.userService.changePassword(this.userChangePasswordDTO).subscribe({
      next: data => {
        this.userChangePasswordDTO = data.response
        this.tokenService.deleteTokenChangePassword();
      }
    })
  }

  public equalPassword(): boolean {
    return this.userChangePasswordDTO.newPassword ==
      this.userChangePasswordDTO.confirmPassword;
  }
}
