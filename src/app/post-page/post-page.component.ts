import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IPost } from 'src/environments/interface';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent {
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
    });
    console.log(this.route);
  }
}
