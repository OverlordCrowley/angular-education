import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-other',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './other.component.html',
  styleUrl: './other.component.css'
})
export class OtherComponent {

}
