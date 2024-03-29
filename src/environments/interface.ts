export interface Environment {
  apiKey: string;
  production: boolean;
  fbDbUrl: string;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface IPost {
  id?: string;
  title: string;
  text: string;
  author: string;
  date: Date;
}

export class Post {
  title = '';
  text = '';
  author = '';
  date = new Date();
}
