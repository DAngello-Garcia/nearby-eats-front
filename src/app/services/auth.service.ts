import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterClientDTO } from '../dto/register-client-dto';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../dto/menssage-dto';
import { LoginDTO } from '../dto/login-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }
  
  public loginClient(loginDTO: LoginDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.authURL}/login-user`, loginDTO) || 
    this.http.post<MenssageDTO>(`${this.authURL}/login-moderator`, loginDTO) ;
  }

}

