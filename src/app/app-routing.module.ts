import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutusComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'userpage', component: UserpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
