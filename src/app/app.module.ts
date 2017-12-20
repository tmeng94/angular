import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AttributeComponent } from './attribute/attribute.component';
import { AttributeInfoComponent } from './attribute-info/attribute-info.component';
import { ConditionComponent } from './condition/condition.component';
import { ConditionInfoComponent } from './condition-info/condition-info.component';
import { ResultComponent } from './result/result.component';


@NgModule({
  declarations: [
    AppComponent,
    AttributeComponent,
    AttributeInfoComponent,
    ConditionComponent,
    ConditionInfoComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
