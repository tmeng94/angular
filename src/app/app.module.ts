import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AttributeComponent } from './attribute/attribute.component';
import { AttributeInfoComponent } from './attribute-info/attribute-info.component';
import { ConditionComponent } from './condition/condition.component';
import { ConditionInfoComponent } from './condition-info/condition-info.component';
import { ResultComponent } from './result/result.component';
import { AggregationComponent } from './aggregation/aggregation.component';
import { AggregationInfoComponent } from './aggregation-info/aggregation-info.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AttributeComponent,
    AttributeInfoComponent,
    ConditionComponent,
    ConditionInfoComponent,
    ResultComponent,
    AggregationComponent,
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
