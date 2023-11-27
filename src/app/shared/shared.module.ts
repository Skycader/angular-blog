import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot()],
  exports: [HttpClientModule, QuillModule, SearchPipe],
  declarations: [SearchPipe],
})
export class SharedModule { }
