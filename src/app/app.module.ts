import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { PostComponent } from './shared/components/post/post.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth.interceptor';
import ruLocale from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(ruLocale, 'ru');

const INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor,
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    NotFoundComponent,
    PostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, QuillModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule { }
