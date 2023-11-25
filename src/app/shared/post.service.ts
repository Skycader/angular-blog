import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPost } from 'src/environments/interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  public create(post: IPost) {
    return this.http.post(`${environment.fbDbUrl}/post.json`, post);
  }
}
