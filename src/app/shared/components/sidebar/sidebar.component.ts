import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service.ts.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get tags(): string[]{
    return [...this.gifsService.tagsHistory]
  }

  async search(tag: string):Promise<void>{
    await this.gifsService.searchTag(tag)
  }

}
