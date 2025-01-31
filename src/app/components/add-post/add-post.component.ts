import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  title: string = '';
  text: string = '';
  image: string = '';
  selectedTags: string[] = [];

  constructor(private dataService: DataService) {}

  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    console.log(this.selectedTags)
    if (index === -1) {
        this.selectedTags.push(tag);
    } else {
        this.selectedTags.splice(index, 1);
    }
  } 

  addPost(form: any) {
    if(this.title.trim() && this.text.trim()) {
      this.dataService.addPost({
        title: this.title,
        text: this.text,
        image: this.image || 'https://www.pandasecurity.com/en/mediacenter/src/uploads/2013/11/pandasecurity-facebook-photo-privacy.jpg',
        tags: this.selectedTags
      }).subscribe(response => {
        console.log('Post added successfully:', response);
        alert('Post został dodany!');
        // Możesz dodać logikę do obsługi odpowiedzi, np. resetowanie formularza
      }, error => {
        console.error('Error adding post:', error);
        alert('Wystąpił problem przy dodaniu posta. Upewnij się że odpowiednio uzupełniłes wszystkie pola!');
      });
      this.title = '';
      this.text = '';
      this.image = '';

      form.resetForm();
    } else {
      alert('Wypełnij wymagane pola!');
    }
  }

}
