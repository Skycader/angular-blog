import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { IPost } from 'src/environments/interface';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent {
  public isUpdating: boolean = false;
  public postId: string = '';
  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });
  public loading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.postId = params['id'];
          return this.postService.getById(params['id']);
        })
      )
      .subscribe((post: any) => {
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        });

        this.loading = false;
      });
  }

  public submit() {
    this.isUpdating = true;
    const post: IPost = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: 'Axl',
      date: new Date(),
    };

    console.log('POST: ', post);

    this.postService.updatePost(this.postId, post).subscribe(() => {
      this.isUpdating = false;
    });
  }
}
