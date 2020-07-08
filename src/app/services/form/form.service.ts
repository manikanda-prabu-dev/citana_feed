import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http'
import { Observable  } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class FormService {
  public url:any = "https://cintana.herokuapp.com/"
  // public url:any = "http://localhost:9090/"
  constructor(private http : HttpClient ) {}


  register(user) : Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(`${this.url}admin/register` , user, {headers : headers});
  }

  login(user): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(`${this.url}admin/login` , user, {headers : headers});
  }
}
