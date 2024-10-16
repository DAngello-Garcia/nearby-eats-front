import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../../dto/menssage-dto';
import { RegisterClientDTO } from '../../dto/user/register-client-dto';
import { UserUpdateDTO } from '../../dto/user/user-update-dto';
import { UserChangePasswordDTO } from '../../dto/user/user-change-password-dto';
import { UserInformationDTO } from '../../dto/user/user-information-dto';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userURL = "https://nearbyeats-1.onrender.com/api/user";

  constructor(private http: HttpClient) { }

  public registerUser(UserRegistrationDTO: RegisterClientDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.userURL}/register-user`, UserRegistrationDTO)
  }

  public updateUserUSer(updateUserUSerDTO: UserUpdateDTO): Observable<MenssageDTO> {
    return this.http.patch<MenssageDTO>(`${this.userURL}/update-account-user`, updateUserUSerDTO)
  }

  public deleteUser(): Observable<MenssageDTO> {
    return this.http.delete<MenssageDTO>(`${this.userURL}/register-user`)
  }

  public sendRecoveryEmail(email: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.userURL}/change-password/send-recovery-email/${email}`)
  }

  public changePassword(userChangePassworDTO: UserChangePasswordDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.userURL}/change-password`, userChangePassworDTO)
  }

  public getAllUsers(): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.userURL}/get-all-users`);
  }

  public getUser(id: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.userURL}/get-user/${id}`)

  }

}

