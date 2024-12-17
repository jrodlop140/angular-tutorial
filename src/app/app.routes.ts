import { Routes } from '@angular/router';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { StatsComponent } from './components/dashboard/stats/stats.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NotfoundComponent } from './components/pages/notfound/notfound.component';
import { TasksComponent } from './components/pages/tasks/tasks.component';
import { TaskformComponent } from './components/task/taskform/taskform.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { SigninComponent } from './components/pages/auth/signin/signin.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singin', component: SigninComponent },
  { path: 'home', component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'tasks', component: TasksComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'stats', component: StatsComponent },
      { path: 'profile', component: ProfileComponent }
    ],
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  { path: 'taskedit/:id', component: TaskformComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) },
  { path: 'notfound', component: NotfoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' },
];
