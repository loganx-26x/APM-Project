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
    <div><h1>{{pageTitle}}</h1>
    <pm-products></pm-products>
    </div>
  `
})
export class AppComponent{
  pageTitle: string="Acme Product Management"
}