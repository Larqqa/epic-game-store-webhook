import { GameSchema } from './schemas/gameSchema';
import { image } from './schemas/gameSchema';

export default class Game {
  private title: string;
  private description: string;
  private thumbnail: image | undefined;
  private id: string;
  private productSlug: string
  private effectiveDate: Date;
  private developerName: string;
  private publisherName: string;
  private image: image | undefined;
  private currencyCode: string;
  private originalPrice: string;
  private discountPrice: string;
  private startDate: Date;
  private endDate: Date;
  private priceFormatter: Intl.NumberFormat;

  constructor(game: GameSchema){
    this.title = game?.title;
    this.description = game?.description;
    this.id = game?.id;
    this.productSlug = game?.productSlug;
    this.effectiveDate = new Date(game?.effectiveDate);

    this.developerName = game?.customAttributes.find( attr => attr.key === 'developerName')?.value || 'N/A';
    this.publisherName = game?.customAttributes.find( attr => attr.key === 'publisherName')?.value || 'N/A';

    this.thumbnail = game?.keyImages.find(image => image.type === 'Thumbnail');

    this.image = game?.keyImages.find(image => image.type === 'OfferImageWide');
    if (!this.image) this.image = game?.keyImages[0];

    this.currencyCode = game?.price?.totalPrice?.currencyCode;
    this.priceFormatter = new Intl.NumberFormat(
      this.currencyCode,
      { style: 'currency', currency: this.currencyCode, minimumFractionDigits: 0 }
    );

    this.originalPrice = this.formatPrice(game?.price?.totalPrice?.originalPrice);
    this.discountPrice = this.formatPrice(game?.price?.totalPrice?.discountPrice);

    if (game?.promotions?.promotionalOffers.length !== 0) {
      const promotionDate = game?.promotions?.promotionalOffers[0]?.promotionalOffers[0];
      this.startDate = new Date(promotionDate?.startDate);
      this.endDate = new Date(promotionDate?.endDate);

    } else if (game?.promotions?.upcomingPromotionalOffers.length !== 0) {
      const promotionDate = game?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0];
      this.startDate = new Date(promotionDate?.startDate);
      this.endDate = new Date(promotionDate?.endDate);

    } else {
      this.startDate = new Date('invalid');
      this.endDate = new Date('invalid');
    }
  }

  private formatPrice(price: number | undefined): string {
    if (price === undefined) return 'N/A';

    return this.priceFormatter.format(price);
  }

  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public  getProductSlug(): string {
    return this.productSlug;
  }

  public  getThumbnail(): image | undefined {
    return this.thumbnail;
  }

  public getDeveloperName(): string {
    return this.developerName;
  }

  public getPublisherName(): string {
    return this.publisherName;
  }

  public getEffectiveDate(): Date {
    return this.effectiveDate;
  }

  public getImage(): image | undefined {
    return this.image;
  }

  public getCurrencyCode(): string {
    return this.currencyCode;
  }

  public getOriginalPrice(): string {
    return this.originalPrice;
  }

  public getDiscountPrice(): string {
    return this.discountPrice;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date {
    return this.endDate;
  }
}
