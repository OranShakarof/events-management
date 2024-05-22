import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import CategoryModel from 'src/app/models/category.model';
import { FormsModule } from '@angular/forms';
import EventModel from 'src/app/models/event.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent {
    public categories: CategoryModel[];
    public event = new EventModel();
    
    public constructor(private dataService: DataService, private route: Router) {}
    
    
    public async ngOnInit() {
        try{
            this.categories = await this.dataService.getAllCategories();
        }
        catch(err: any){
            alert(err.message);
        }
    }

    public async send(){
        try{
            await this.dataService.addEvent(this.event);
            alert("The event has been added!");
            this.route.navigateByUrl("/list");
        }
        catch(err: any){
            alert(err.message);
        }
    }
}
