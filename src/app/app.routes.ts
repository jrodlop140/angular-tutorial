import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: 'list', component: ListComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
];
