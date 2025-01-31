import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsServiceService {

  private url = 'http://localhost:3000';
  
  
  constructor(private http: HttpClient) {
  }
  

  // getComments(id: string) {
  //   return this.http.get(this.url + '/api/posts/'+id+'/comments');
  // }
  
  public addComment(id: number, comment: {author: string; text: string;}) {
    console.log(this.url + '/api/post/'+ id +'/comment', comment);
    return this.http.post(this.url + '/api/post/'+ id +'/comment', comment);
  }
}
