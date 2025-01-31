import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import {BlogComponent} from "../blog/blog.component";
import { GalleryComponent } from '../gallery/gallery.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { DataService } from '../../services/data.service';
import { BlogFooterComponent } from '../blog-footer/blog-footer.component';

@Component({
 selector: 'blog-home',
 standalone: true,
 imports: [SearchBarComponent, BlogComponent, GalleryComponent,BlogFooterComponent],
 providers: [DataService],
 templateUrl: './blog-home.component.html',
 styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent implements OnInit {

@ViewChild(BlogComponent) blogComponent!: BlogComponent;
@ViewChild(GalleryComponent) galleryComponent!: GalleryComponent;
 public filterText: string = '';

 constructor() {
}

ngOnInit(): void {
}

getName($event: string): void {
  this.filterText = $event;
}

refreshPage():void {
  this.blogComponent.getAll();
  this.galleryComponent.loadImages();
}

}
