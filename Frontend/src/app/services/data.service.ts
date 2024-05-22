import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import CategoryModel from '../models/category.model';
import EventModel from '../models/event.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public constructor(private http: HttpClient) { }

    public async getAllCategories(): Promise<CategoryModel[]> {
        const observable = this.http.get<CategoryModel[]>(environment.categoriesUrl);
        const categories = await firstValueFrom(observable);
        return categories;
    }

    public async getEventsByCategory(categoryId: string): Promise<EventModel[]> {
        const observable = this.http.get<EventModel[]>(environment.eventsByCategoryUrl + categoryId);
        const events = await firstValueFrom(observable);
        return events;
    }

    public async addEvent(event: EventModel): Promise<void> {
        const observable = this.http.post<EventModel>(environment.eventsUrl, event);
        await firstValueFrom(observable);
    }

    public async deleteEvent(_id: string): Promise<void> {
        const observable = this.http.delete<EventModel>(environment.eventsUrl + _id);
        await firstValueFrom(observable);
    }

}
