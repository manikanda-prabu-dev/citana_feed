import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable  } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public url:any = "https://cintana.herokuapp.com/"
  constructor(private http : HttpClient ) {}


  userComment(comment_message): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type' , 'application/json');
    return this.http.post(`${this.url}feed/comment` , comment_message, {headers : headers});
  }
}
