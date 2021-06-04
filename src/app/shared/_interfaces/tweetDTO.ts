import { DetailsUserDTO } from './detailsUserDTO.model';
export interface TweetDTO {
  id: number;
  body: string;
  image: string;
  creationDate: Date;
  likeCount: number;
  replyCount: number;
  author: DetailsUserDTO;
}
