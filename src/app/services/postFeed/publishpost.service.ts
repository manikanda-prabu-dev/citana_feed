import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable  } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PublishpostService {

  public url:any = "https://cintana.herokuapp.com/"
  constructor(private http : HttpClient ) {}

  publishPost(postMessage): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(`${this.url}feed/post` , postMessage, {headers : headers});
  }

  getPublishedPosts():Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type' , 'application/json');
    return this.http.get(`${this.url}feed/getfeeds`);
  }

}
