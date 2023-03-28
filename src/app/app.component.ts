import { Component } from "@angular/core";

/*import { Component } from '@angular/core';

@Component({    Component decorator that defines the metadata
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {     It defines the properties and methods needed by our view
  title = 'Angular: Getting Started';
}
*/

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
      <a class='navbar-brand'>{{pageTitle}}</a>
      <ul class='nav nav-pills'>
        <li><a class='nav-link' routerLink='/welcome' >Home</a></li>
        <li><a class='nav-link' routerLink='/products' >Product List</a></li>
      </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent{
  pageTitle: string="Acme Product Management"
}