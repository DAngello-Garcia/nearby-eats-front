import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterClientDTO } from '../../dto/user/register-client-dto';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../../dto/menssage-dto';
import { LoginDTO } from '../../dto/user/login-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "https://nearbyeats.onrender.com/api/auth";

  constructor(private http: HttpClient) { }

  public loginClient(loginDTO: LoginDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.authURL}/login-user`, loginDTO) || 
    this.http.post<MenssageDTO>(`${this.authURL}/login-moderator`, loginDTO) ;
  }

}

