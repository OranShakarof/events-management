import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import CategoryModel from 'src/app/models/category.model';
import { DataService } from 'src/app/services/data.service';
import EventModel from 'src/app/models/event.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    
    public categories: CategoryModel[];
    public events: EventModel[];

    public constructor(private dataService: DataService) {}
    
    
    public async ngOnInit() {
        try{
            this.categories = await this.dataService.getAllCategories();
        }
        catch(err: any){
            alert(err.message);
        }
    }

    public async getEvents(args: Event){
        try{
            const _id = (args.target as HTMLSelectElement).value;
            this.events = await this.dataService.getEventsByCategory(_id);
        }
        catch(err: any){
            alert(err.message);
        }
    }

    public isEventPassed(eventDate: string): boolean {
        // Compare the event date with the current date
        return new Date(eventDate) < new Date();
    }

    public async deleteMe(_id: string){
        try{
            const sure = window.confirm("Are you sure?");
            if(!sure) return;
            await this.dataService.deleteEvent(_id);
            alert("Event has been deleted Successfully!")
            this.events = this.events.filter(e=> e._id !== _id);
        }
        catch(err: any){
            alert(err.message);
        }
    }

}
