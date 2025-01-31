import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  images: string[] = [];
  enlargedImage: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {
    this.loadImages();
  }

  loadImages() {
    this.subscription.add(
      this.dataService.getAll().subscribe({
        next: (posts) => {
          if (Array.isArray(posts)) {
            this.images = posts.map((post) => post.image).filter(image => image);
          } else {
            console.error('Expected an array from dataService.getAll()');
          }
        },
        error: (error) => {
          console.error('Error loading images:', error);
        }
      })
    );
  }

  enlargeImage(image: string) {
    this.enlargedImage = image;
  }

  closeImage() {
    this.enlargedImage = null;
  }
  scrollGallery(amount: number) {
    const gallery = document.getElementById("gallery");
    if (gallery) {
      gallery.scrollBy({ left: amount, behavior: "smooth" });
    }
  }
}
