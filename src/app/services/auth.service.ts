import {Injectable} from '@angular/core';
import {environment} from '../../environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  login(data:any): Observable<any> {
    return this.http.post(this.baseUrl + '/login', data);
  }

  register(data:any): Observable<any> {
    return this.http.post(this.baseUrl + '/register', data);
  }

  saveToken(token:string): void{
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  clearToken(): void {
    localStorage.removeItem('jwtToken');
  }
}


