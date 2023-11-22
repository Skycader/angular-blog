import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPost } from 'src/environments/interface';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent {
  constructor() { }

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
  }
}
