import { Component } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { IPost } from 'src/environments/interface';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  public posts: IPost[] = [];
  public searchStr: string = '';
  public loading: boolean = false;
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }
  public getPosts() {
    this.loading = true;
    this.postService.getAllPosts().subscribe((posts: IPost[]) => {
      this.loading = false;
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
