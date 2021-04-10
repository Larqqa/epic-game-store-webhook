export type image = { type: string, url: string };

type promotionalOffers = {
  promotionalOffers: {
    startDate: string,
    endDate: string,
    discountSettings: {
      discountType: string,
      discountPercentage: number
    }
  }[]
}[];

export interface GameSchema {
  title: string,
  id: string,
  namespace: string,
  description: string,
  effectiveDate: string,
  offerType: string,
  expiryDate: null | string,
  status: string,
  isCodeRedemptionOnly: boolean,
  keyImages: image[],
  seller: {
    id: string,
    name: string
  },
  productSlug: string,
  urlSlug: string,
  url: null | string,
  items: {
    id: string,
    namespace: string
  }[],
  customAttributes: {
    key: string,
    value: string
  }[],
  categories: {
    path: string
  }[],
  tags: {
    id: string
  }[],
  price: {
    totalPrice: {
      discountPrice: number,
      originalPrice: number,
      voucherDiscount: number,
      discount: number,
      currencyCode: string,
      currencyInfo: {
        decimals: number
      },
      fmtPrice: {
        originalPrice: string,
        discountPrice: string,
        intermediatePrice: string
      }
    },
    lineOffers: {
      appliedRules: []
    }[]
  },
  promotions: {
    promotionalOffers: promotionalOffers,
    upcomingPromotionalOffers: promotionalOffers
  }
};
