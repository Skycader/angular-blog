import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/environments/interface';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public posts$: Observable<IPost[]> = new Observable();
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts$ = this.postService.getAllPosts();
  }
}
