import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IPost } from 'src/environments/interface';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent {
  public post$: Observable<IPost> = new Observable();
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.post$ = this.route.params.pipe(
      switchMap((params: Params) => this.postService.getById(params['id'])),
    );
  }
}
