import { Component, Input } from '@angular/core';
import { BlogItemImageComponent } from '../blog-item-image/blog-item-image.component';
import { BlogItemTextComponent } from '../blog-item-text/blog-item-text.component';
import { CommentsSectionComponent } from '../comments-section/comments-section.component';

interface IComment {
  author: string;
  text: string;
}
interface ITag {
  tagName: String;
}

@Component({
  selector: 'blog-item',
  standalone: true,
  imports: [BlogItemImageComponent, BlogItemTextComponent, CommentsSectionComponent],
  templateUrl: './blog-item.component.html',
  styleUrl: './blog-item.component.css'
})

export class BlogItemComponent {
  @Input() image?: string;
  @Input() title?: string;
  @Input() text?: string;
  @Input() id!: number;
  @Input() tags?: ITag[];
  @Input() comments?: IComment[];
}

