import { Routes, LoadChildren } from '@angular/router';
import { MainHomeComponent } from "./components/main-home/main-home.component"
import { RegisteModule } from "./components/register/register.module";
import { LoginModule } from "./components/login/login.module";


export const routes: Routes = [
    {
        path: '',
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: 'about',
        component: MainHomeComponent
    },
    {
        path: 'home',
        component: MainHomeComponent
    },
    {
        path: 'schedule/events',
        component: MainHomeComponent
    },

    {
        path: 'create/events',
        component: MainHomeComponent
    },
    {
        path: "register",
        loadChildren: "./components/register/register.module#RegisteModule"
    },
    {
        path: "login",
        loadChildren: "./components/login/login.module#LoginModule"
    },
    {
        path: "profile",
        loadChildren: "./components/profile/profile.module#ProfileModule"
    }


];

// [
//     {
//         path: '',
//         redirectTo: 'login',
//         pathMatch: 'full'
//     },
//     {
//         path: 'api/contacts',
//         component: MainHomeComponent
//     },
//     {
//         path: "new",
//         component: MainHomeComponent
//     },
//     {
//         path: "login",
//         component: MainHomeComponent
//     }
// ];