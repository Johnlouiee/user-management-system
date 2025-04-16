import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  standalone: true, // Mark as standalone
  imports: [RouterModule], // Add RouterModule to imports
  templateUrl: 'layout.component.html'
})
export class LayoutComponent { }