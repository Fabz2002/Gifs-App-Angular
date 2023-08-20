import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'

@Injectable({providedIn: 'root'})
export class GifsService {

    private _tagsHistory:string[] = [];
    private apiKey:string='xRUTjmg4BxWX7C1KqfSWNhmQk4yLuqdw';
    private serviceUrl:string ='https://api.giphy.com/v1/gifs';
    constructor( private http : HttpClient) { }
    get tagsHistory(){
       return  [...this._tagsHistory];
    }
    private organizeHistory(tag:string) {
        tag = tag.toLowerCase();
        if (this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag)=>oldTag !== tag)
        }
        this._tagsHistory.unshift(tag);

        this._tagsHistory.slice(0,10);

    }
    public  searchTag(tag:string):void{

        if(tag.length === 0) return ;

        const params = new HttpParams().set('api_key',this.apiKey).set('limit',10).set('q',tag);
        this.organizeHistory(tag);
        this.http.get(`${this.serviceUrl}/search`,{params}).subscribe((res:any)=>console.log(res));

    }
    
}