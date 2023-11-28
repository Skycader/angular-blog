import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IPost } from 'src/environments/interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  public posts: IPost[] = [];
  public searchStr: string = '';
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }
  public getPosts() {
    this.postService.getAllPosts().subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
  }

  public removePost(id: string) {
    console.log('id: ', id);
    this.postService.removePost(id).subscribe(() => {
      this.posts = this.posts.filter((post: IPost) => post.id !== id);
    });
  }
}
