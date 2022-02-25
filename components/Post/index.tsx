import SimplePost from './simple';

export type Post = {
  id: string;
  title: string;
  content?: string;
  link?: string;
  repository?: string;
  published: boolean;
  cover: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
};

export default SimplePost;
