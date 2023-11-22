export interface Environment {
  apiKey: string;
  production: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface IPost {
  title: string;
  text: string;
  author: string;
  date: Date;
}
