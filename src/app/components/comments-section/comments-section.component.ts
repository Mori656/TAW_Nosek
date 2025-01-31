import { Component, Input } from '@angular/core';
import { CommentsServiceService } from '../../services/comments-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';


interface IComment {
  author: string;
  text: string;
}

@Component({
  selector: 'comments-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})
export class CommentsSectionComponent {
  @Input() id!: number;
  @Input() comments?: IComment[];
  author = '';
  text = '';

  constructor(private commentsService: CommentsServiceService) {}


    addComment(form: any) {
      if(this.author.trim() && this.text.trim()) {
        this.commentsService.addComment(
          this.id,
          { author: this.author,text: this.text}
        ).subscribe(response => {
          console.log('Comment added successfully:', response);
          alert('Komentarz został dodany!');
          // Możesz dodać logikę do obsługi odpowiedzi, np. resetowanie formularza
        }, error => {
          console.error('Error adding comment:', error);
          alert('Wystąpił problem przy dodaniu Komentarza. Upewnij się że odpowiednio uzupełniłes wszystkie pola!');
        });
        this.author = '';
        this.text = '';
  
        form.resetForm();
      } else {
        alert('Wypełnij wymagane pola!');
      }
  }
}
