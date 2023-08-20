import { Component } from '@angular/core';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  public addTagSearched(tag:string):void{
    console.log('add',tag)
  }
}
