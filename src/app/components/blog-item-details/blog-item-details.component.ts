import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DataService} from "../../services/data.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
 selector: 'app-blog-item-details',
 standalone: true,
 imports: [HttpClientModule],
 providers: [DataService],
 templateUrl: './blog-item-details.component.html',
 styleUrl: './blog-item-details.component.css'
})
export class BlogItemDetailsComponent implements OnInit {
 public image: string = '';
 public text: string = '';

 constructor(private service: DataService, private route: ActivatedRoute) {
 }

 ngOnInit() {
  this.route.paramMap.subscribe((params: ParamMap) => {
    const id: string | null = params.get('id');
    
    if (id) {
      this.service.getById(id).subscribe((res: any) => {
        this.image = res[0].image;
        this.text = res[0].text;
      });
    } else {
      console.error('ID not found in route parameters');
    }
  });
}
}
