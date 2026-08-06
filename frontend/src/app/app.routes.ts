import { Routes } from '@angular/router';
import { Tasks } from './pages/tasks/tasks'
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'tasks',
        component: Tasks,
        canActivate: [authGuard]
    }
];
