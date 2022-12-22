import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface IUser {
  _id: string;
  userName: string;
  image: string;
}

export interface IPostedBy extends IUser {}

export interface ISave {
  postedBy: IPostedBy;
  userId: string;
}

export interface IComment {
  postedBy: IPostedBy;
  comment: string;
}

export interface IPin {
  _id: string;
  title: string;
  about: string;
  destination: string;
  category: string;
  image: SanityImageSource;
  userId: string;
  postedBy: IPostedBy;
  save: ISave[];
  comments: IComment[];
}
