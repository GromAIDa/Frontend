import { Component, Input } from '@angular/core';
import { Post } from '@interfaces/post';
import { ImgService } from '@services/img.service';
import { ModalService } from '@shared/modal';

@Component({
  selector: 'app-blog-modal',
  templateUrl: './blog-modal.component.html',
  styleUrls: ['./blog-modal.component.scss']
})
export class BlogModalComponent {
  @Input() post!: Post;

  constructor(public imgService: ImgService, public modalService: ModalService){}

  getDate(date: string) {
    let array = new Date(date).toDateString().split(' ')
    array.shift()
    return array.join(' ')
  }

}
