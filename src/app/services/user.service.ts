import { Injectable } from '@angular/core';
import { UserServiceService } from './controllers/user-service.service';
import { TokenService } from './token.service';
import { UserInformationDTO } from '../dto/user/user-information-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  id: string = ''
  client: UserInformationDTO;

  constructor(
    private userSevice: UserServiceService,
    private tokenUser: TokenService) { 
      this.id = tokenUser.getId();
      this.client = new UserInformationDTO()

    }

  public getUser() {
    this.userSevice.getUser(this.id).subscribe({
      next: data => {
        this.client = data.response;
      }
    });
  }
}
