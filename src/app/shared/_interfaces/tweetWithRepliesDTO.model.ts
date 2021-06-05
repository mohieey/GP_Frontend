import { DetailsUserDTO } from './detailsUserDTO.model';
import { TweetDTO } from './tweetDTO';
export interface TweetWithRepliesDTO {
  id: number;
  body: string;
  image: string;
  creationDate: Date;
  likeCount: number;
  replyCount: number;
  replies: TweetDTO;
  author: DetailsUserDTO;
}
