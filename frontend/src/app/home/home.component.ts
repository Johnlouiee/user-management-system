import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class HomeComponent {
    constructor() { }
}
