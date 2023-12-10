import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/shared/post.service';
import { FbAuthResponse, IPost } from 'src/environments/interface';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent {
  constructor(
    private postService: PostService,
    private alertService: AlertService,
  ) { }

  public form = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });

  public submit() {
    const post: IPost = {
      title: this.form.value.title || '',
      text: this.form.value.text || '',
      author: 'Axl',
      date: new Date(),
    };

    console.log('POST: ', post);

    this.postService.create(post).subscribe((res: any) => {
      console.log(res);
      this.form.reset();
      this.alertService.success('Пост был создан');
    });
  }
}
