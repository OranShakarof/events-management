import { Routes } from '@angular/router';
import { InsertComponent } from './components/data-area/insert/insert.component';
import { ListComponent } from './components/data-area/list/list.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "list", component: ListComponent },
    { path: "insert", component: InsertComponent },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", pathMatch: "full" , component: PageNotFoundComponent },
    
];
