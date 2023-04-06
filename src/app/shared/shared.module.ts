import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star-component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StarComponent],
  imports: [
    // CommonModule,
  ],
  exports: [CommonModule, FormsModule, StarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
