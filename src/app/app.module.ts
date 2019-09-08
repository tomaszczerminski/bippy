import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatIconModule, MatGridListModule, MatCheckboxModule, MatRadioModule, MatSliderModule, MatSelectModule, MatDialogModule, MatDividerModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent, WarningDialog } from './components/form.component';
import { GravatarModule } from 'ngx-gravatar';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    WarningDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    GravatarModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatStepperModule,
  ],
  providers: [],
  entryComponents: [
    WarningDialog,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
