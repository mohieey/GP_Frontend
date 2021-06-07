import { DetailsUserDTO } from './detailsUserDTO.model';
import { ImageDTO } from './imageDTO';
import { TweetDTO } from './tweetDTO';
import { VideoDTO } from './videoDTO';
export interface TweetWithRepliesDTO {
  id: number;
  body: string;
  images: ImageDTO[];
  video: VideoDTO
  creationDate: Date;
  likeCount: number;
  replyCount: number;
  replies: TweetDTO;
  author: DetailsUserDTO;
}
