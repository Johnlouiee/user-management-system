import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  standalone: true, // Mark as standalone
  imports: [RouterModule], // Include RouterModule for routing directives
  templateUrl: 'subnav.component.html'
})
export class SubNavComponent { }