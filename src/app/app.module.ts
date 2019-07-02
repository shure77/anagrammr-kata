import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyFormComponent } from './my-form/my-form.component';
import { AnagrammListingComponent } from './anagramm-listing/anagramm-listing.component';
import { NoDupsPipe } from './no-dups.pipe';
import { DictonaryService } from './dictonary.service';

@NgModule({
  declarations: [
    AppComponent,
    MyFormComponent,
    AnagrammListingComponent,
    NoDupsPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [
    DictonaryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
