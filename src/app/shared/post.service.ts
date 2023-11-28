import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  public getAllPosts(): Observable<IPost[]> {
    return this.http.get(`${environment.fbDbUrl}/post.json`).pipe(
      map((response: { [key: string]: any }) => {
        const keys = Object.keys(response);
        const posts: IPost[] = [];
        for (let key of keys) {
          let obj = response[key];
          obj.id = key;
          posts.push(obj);
        }

        return posts;
      })
    );
  }

  public getById(id: string) {
    return this.http.get(`${environment.fbDbUrl}/post/${id}.json`);
  }

  public updatePost(id: string, post: IPost) {
    return this.http.patch(`${environment.fbDbUrl}/post/${id}.json`, post);
  }

  public removePost(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/post/${id}.json`);
  }
}
