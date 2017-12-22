import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AttributeInfoComponent } from './attribute-info/attribute-info.component';
import { ConditionInfoComponent } from './condition-info/condition-info.component';
import { ResultComponent } from './result/result.component';
import { AggregationInfoComponent } from './aggregation-info/aggregation-info.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatOptionModule,
  MatTableModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AttributeInfoComponent,
    ConditionInfoComponent,
    ResultComponent,
    AggregationInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
