import { Routes } from '@angular/router';
import { JugueteListComponent } from './components/juguete-list/juguete-list.component';
import { JugueteEditComponent } from './components/juguete-edit/juguete-edit.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'juguete/list',
        pathMatch: "full"
    },
    {
        path: 'juguete/list',
        component: JugueteListComponent
    },
    {
        path: 'juguete/edit/:id',
        component: JugueteEditComponent
    },
    {
        path: 'juguete/add',
        component: JugueteEditComponent
    },
    {
        path: '**',
        redirectTo: 'juguete/list',
        pathMatch: "full"
    },
];
