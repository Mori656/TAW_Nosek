import {Component, input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {BlogItemComponent} from "../blog-item/blog-item.component";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { FilterTextPipe } from '../../pipes/filter-text.pipe';
import { Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
 selector: 'blog',
 standalone: true,
 imports: [HttpClientModule, BlogItemComponent, CommonModule, FilterTextPipe],
 providers: [DataService, AuthService],
 templateUrl: './blog.component.html',
 styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  @Input() filterText = '';
  tags = ['Praca','Edukacja','Zdrowie','Technologia','Sport','Podróże','Kultura','Muzyka','Nauka','Rozrywka'];
  selectedTags: string[] = [];

 public items$: any;

 constructor(private service: DataService) {
 }
 ngOnInit() {
   this.getAll();
 }

 public getAll(){
    this.service.getAll().subscribe(response => {
      this.items$ = response;
   });
 }
 toggleTag(tag: string) {
  const index = this.selectedTags.indexOf(tag);
  console.log(this.selectedTags)
  if (index === -1) {
      this.selectedTags.push(tag);
  } else {
      this.selectedTags.splice(index, 1);
  }
} 
  filterTagCheck(itemTags: string[]):boolean {
    return this.selectedTags.every(tag => itemTags.includes(tag));
  }
}
