import Game from './Game';
import { image } from './schemas/gameSchema';

export default class Embed {
  private title: string;
  private url: string;
  private author: { name: string, icon_url: string, url: string };
  private description: string;
  private thumbnail: image | undefined;
  private image: image | undefined;
  private fields: { name: string, value: string | number | undefined, inline: boolean }[];
  private timestamp: Date;
  private footer: { text: string };

  constructor(game: Game) {
    this.title = game.getTitle();
    this.url = `https://www.epicgames.com/store/en-US/product/${game.getProductSlug()}`;
    this.author = {
      name: 'Epic Game Store',
      icon_url: '',
      url: ''
    };

    // this.description = game.getDescription();
    this.description = '';

    // this.thumbnail = game.getThumbnail();
    this.image = game.getImage();

    this.fields = [
      { name: 'Developer: ', value: game.getDeveloperName(), inline: true },
      { name: 'Publisher: ', value: game.getPublisherName(), inline: true },
      { name: 'From: ', value: this.getDateRange(game.getStartDate(), game.getEndDate()), inline: false },
      { name: 'Original Price:', value: game.getOriginalPrice(), inline: true },
      { name: 'Discount Price:', value: game.getDiscountPrice(), inline: true },
    ];

    this.timestamp = new Date();
    this.footer = {
      text: `Effective Date: ${this.formatDate(game.getEffectiveDate())}`
    };
  }

  private getDateRange(startDate: Date, endDate: Date): string {
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return 'N/A';

    return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
  }

  private formatDate(date: Date): string {
    if (isNaN(date.getTime())) return 'N/A';

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }
}