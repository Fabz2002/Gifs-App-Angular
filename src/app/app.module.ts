import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GifsModule } from './gifs/gifs.module';
import { SharedModule } from './shared/shared.module';


import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { LazyImageComponent } from './shared/components/lazy-image/lazy-image.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GifsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
