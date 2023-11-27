import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from 'src/environments/interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(posts: IPost[], search: string): IPost[] {
    if (!search.trim()) {
      return posts;
    }
    return posts.filter((post: IPost) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );
  }
}
