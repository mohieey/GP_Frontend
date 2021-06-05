import { DetailsUserDTO } from './detailsUserDTO.model';
import { ImageDTO } from './imageDTO';
import { VideoDTO } from './videoDTO';
export interface TweetDTO {
  id: number;
  body: string;
  images: ImageDTO[];
  video: VideoDTO
  creationDate: Date;
  likeCount: number;
  replyCount: number;
  author: DetailsUserDTO;
}
