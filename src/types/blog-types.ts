export interface Post {
  date: string;
  link: string;
  post: string;
  title: string;
}

export interface PostsList {
  [key: string]: Post;
}
