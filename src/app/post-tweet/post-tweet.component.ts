import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';
import { AddTweetDTO } from '../shared/_interfaces/addTweetDTO';
import { ImageDTO } from '../shared/_interfaces/imageDTO';
import { VideoDTO } from '../shared/_interfaces/videoDTO';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.css']
})
export class PostTweetComponent implements OnInit {

  modal: HTMLElement;

  modalInput: HTMLInputElement;

  imagesNames: ImageDTO[] = [];
  imageUrls = new Array<string>();
  imageFiles: File[] = [];

  videoName: VideoDTO;
  videoUrls = new String();
  videoFile: File = null;

  constructor(private _tweetService: TweetService) {
  }

  ngOnInit(): void {
    this.modal = document.querySelector('.modal');
    this.modalInput = document.querySelector('.modal-input');
  }

  openPostTweetWindow() {
    console.log('ssssss')
    this.modal.style.display = 'block';

  }

  closePostTweetWindow() {
    this.modal.style.display = 'none';
    // this.modalWrapper.classList.remove('modal-wrapper-display');

    if (this.modalInput.value !== '') {
      this.modalInput.value = '';
    }

    this.imageUrls = [];
    this.videoUrls = '';
    this.imageFiles = [];
    this.videoFile = null;

    var videoList = document.querySelector('.video-list');
    if (videoList.firstChild != null) {
      videoList.firstChild.remove();
    }
  }

  detectImageFiles(event) {
    this.imageUrls = [];
    let files = event.target.files;
    if (files) {
      if (files.length > 4 || this.videoUrls != "") {
        alert("you are allowed with only one gif or 4 images");
        return;
      }
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrls.push(e.target.result);
        };
        this.imageFiles.push(file);
        reader.readAsDataURL(file);
      }
    }
  }

  detectVideoFiles(event) {
    this.videoUrls = "";
    let files = event.target.files;
    if (files) {
      if (files.length > 1 || this.imageUrls.length != 0) {
        alert("you are allowed with only one gif or 4 images");
        return;
      }
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.videoUrls = e.target.result;

          var videoDiv = document.createElement('div');
          videoDiv.setAttribute('class', 'modal-image position-relative');

          var video = document.createElement('video');
          video.setAttribute('style', 'width: 400px; height: 200px;');
          var videoSource = document.createElement('source');
          var container = document.querySelector('.video-list');

          container.appendChild(videoDiv);
          videoDiv.appendChild(video);
          videoSource.setAttribute('src', e.target.result);
          video.appendChild(videoSource);
          video.load();

          var button = document.createElement('button');
          button.setAttribute('class', 'position-absolute');
          button.setAttribute(
            'style',
            'left: 5%; margin-top: 5px; border: none; background: none; border-radius: 50%;'
          );
          button.addEventListener('click', this.deletVideoFromTweet);
          videoDiv.appendChild(button);

          var i = document.createElement('i');
          i.setAttribute(
            'class',
            'fas fa-times-circle fa-2x text-dark bg-light'
          );
          i.setAttribute('style', 'border-radius: 50%');
          button.appendChild(i);
        };
        this.videoFile = file;
        reader.readAsDataURL(file);
      }
    }
  }

  deletImageFromTweet(event) {
    this.imageUrls.splice(this.imageUrls.indexOf(event.target.parentElement.previousSibling.getAttribute("src")));
    this.imageFiles.splice(event.target.parentElement.previousSibling.getAttribute("data-index"));
  }

  deletVideoFromTweet() {
    this.videoUrls = "";
    this.videoFile = null;
    var videoList = document.querySelector('.video-list');
    videoList.firstChild.remove();
  }

  postTweet() {
    var postText: HTMLTextAreaElement = document.querySelector(".tweet-text");
    if (postText.value == '' && this.videoUrls == "" && this.imageUrls.length == 0) {
      console.log(postText.value);
      return;
    }

    for (var i = 0; i < this.imageFiles.length; i++) {
      var result = this.uploadImage(this.imageFiles[i]);
      if (result == "error") {
        return;
      }
      var image: ImageDTO = {
        imageName: this.imageFiles[i].name
      }
      this.imagesNames.push(image)
    }

    if (this.videoFile != null) {
      var videoresult = this.uploadVideo(this.videoFile);
      if (videoresult == "error") {
        return;
      }
      this.videoName = {
        videoName: this.videoFile.name,
      };
    }

    var tweet: AddTweetDTO = {
      body: postText.value,
      images: this.imagesNames,
      video: this.videoName,
    };

    console.log(tweet);

    this._tweetService.addTweet(tweet).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    );
    this.closePostTweetWindow();
  }

  uploadImage(image: File): string {
    if (image == null)
      return;
    var imageName = ""
    console.log(image.name);
    const formDate = new FormData();
    formDate.append("file", image, image.name);
    this._tweetService.uploadTweetImage(formDate).subscribe(
      data => {
        return data.fileName;
      },
      error => {
        console.log(error)
        alert("error");
        imageName = "error";
      }
    );
    console.log(imageName);
    return imageName;
  }

  uploadVideo(video: File): string {
    if (video == null)
      return;
    console.log(video.name);
    const formDate = new FormData();
    formDate.append("file", video, video.name);
    this._tweetService.uploadTweetVideo(formDate).subscribe(
      data => {
        return data.fileName
      },
      error => {
        console.log(error)
        alert("error");
        return "error";
      }
    );
    return '';
  }
}
