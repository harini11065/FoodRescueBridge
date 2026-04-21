import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CharityDash } from './pages/charity-dash/charity-dash';
import { RestaurantDash } from './pages/restaurant-dash/restaurant-dash';
import { Claim } from './pages/claim/claim';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:Login},
    {path:'register',component:Register},
    {path:'charity-dashboard',component:CharityDash},
    {path:'restaurant-dashboard',component:RestaurantDash},
    {path:'claim',component:Claim}
];
