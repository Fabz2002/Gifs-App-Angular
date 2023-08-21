import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    private _gifsList:Gif[]=[];
    private _tagsHistory:string[] = [];
    private apiKey:string='xRUTjmg4BxWX7C1KqfSWNhmQk4yLuqdw';
    private serviceUrl:string ='https://api.giphy.com/v1/gifs';
    constructor( private http : HttpClient) {this.loadLocalStorage(); }
    get tagsHistory(){
       return  [...this._tagsHistory];
    }

    get gifsList(){
      return [...this._gifsList];
    }
    private organizeHistory(tag:string) {
        tag = tag.toLowerCase();
        if (this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag)=>oldTag !== tag)
        }
        this._tagsHistory.unshift(tag);

        this._tagsHistory.slice(0,10);
        this.saveLocalStorage();

    }
    public  searchTag(tag:string):void{

        if(tag.length === 0) return ;

        const params = new HttpParams().set('api_key',this.apiKey).set('limit',10).set('q',tag);
        this.organizeHistory(tag);
        this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params}).subscribe((res)=>this._gifsList=res.data );

    }

    private saveLocalStorage():void{
      localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage():void {
      if( !localStorage.getItem('history')) return;

      this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

      if ( this._tagsHistory.length === 0 ) return;
      this.searchTag( this._tagsHistory[0] );
    }


}
