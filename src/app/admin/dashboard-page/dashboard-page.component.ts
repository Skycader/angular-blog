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
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPosts();
  }
  public getPosts() {
    this.postService.getAllPosts().subscribe((posts: IPost[]) => {
      this.posts = posts;
    });
  }
}
