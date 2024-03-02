import { Routes } from '@angular/router';
import {SignInComponent} from "./components/sing-in/sing-in.component";
import {SingUpComponent} from "./components/sing-up/sing-up.component";
import {ContactComponent} from "./components/contact/contact.component";
import {AboutUsComponent} from "./components/about-us/about-us.component";
import {ReviewsComponent} from "./components/reviews/reviews.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {TaskForDirectivesComponent} from "./components/task-for-directives/task-for-directives.component";

export const routes: Routes = [
  {path: 'signIn', component: SignInComponent},
  {path: 'signUp', component: SingUpComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'forDirectives', component: TaskForDirectivesComponent},
];
