import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const API_KEY = 'psjY2sndETQTV1bypYY1kiDtmRHhT7Dv';
const URL = 'https://api.giphy.com/v1/gifs/';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  public async searchTag(tag: string): Promise<void> {
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', API_KEY)
      .set('q', tag)
      .set('limit', 10);

    this.http
      .get<SearchResponse>(`${URL}search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });

  }

  private organizeHistory(tag: string): void {
    if (tag.length === 0 || this._tagsHistory.length > 9) {
      return;
    }
    tag = tag.toLocaleLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this.saveLocalStorage(); 
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history')) return;
    this._tagsHistory  = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagsHistory[0]);
  }
}
