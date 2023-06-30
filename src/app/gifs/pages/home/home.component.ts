import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service.ts.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private gifsService:GifsService){}


  get gifs():Gif[]{
    return this.gifsService.gifList;
  }

}
