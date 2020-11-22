const fetch = require('node-fetch');
const URL = 'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions';
const dateDelimiter = '.';

/**
 * Get the duration of the promotion.
 *
 * @param {array} promotions
 *
 * @return {object} the start and end date
 */
function getDuration(promotions) {
  let duration = {
    start: new Date(),
    end: new Date()
  };

  if (promotions !== null) {
    if (promotions.promotionalOffers.length !== 0) {
      const promotionDate = promotions.promotionalOffers[0].promotionalOffers[0];
      duration.start = new Date(promotionDate.startDate);
      duration.end = new Date(promotionDate.endDate);

    } else if (promotions.upcomingPromotionalOffers.length !== 0) {
      const promotionDate = promotions.upcomingPromotionalOffers[0].promotionalOffers[0];
      duration.start = new Date(promotionDate.startDate);
      duration.end = new Date(promotionDate.endDate);

    } else {
      duration.start = new Date();
      duration.end = new Date();
    }
  }

  return duration;
}

/**
 * Format the date string.
 *
 * @param {string} date
 * @param {string} dateDelimiter
 * @return {string} The formatted string
 */
function formatDate(date) {
  return date.getDate() + dateDelimiter + (date.getMonth() + 1) + dateDelimiter + date.getFullYear();
}

/**
 * Check if the games promotion date matches with today
 *
 * @param {Date} dateNow
 * @param {Date} startDate
 * @param {string} flags
 *
 * @return {boolean} boolean
 */
function checkStartDate(dateNow, startDate) {
  if (dateNow < startDate) {
    return false;
  } else {
    return true;
  }
}

/**
 * Get and format pricing.
 *
 * @param {string} discountPrice
 * @param {string} originalPrice
 *
 * @return {object} The price object
 */
function getGamePrices(discountPrice, originalPrice) {
  if (discountPrice === '0') {
    return { name: 'Discount Price:', value: 'FREE', inline: true };
  } else if (discountPrice === originalPrice) {
    return { name: 'Price:', value: originalPrice, inline: true };
  } else {
    return { name: 'Discount Price:', value: discountPrice, inline: true };
  }
}

/**
 * Make and send the embed messages.
 *
 * @param {array} freeGames
 * @param {object} message
 */
async function embedFreeGames(freeGames) {
  return freeGames.filter(game => {
    const dateNow = new Date();
    const duration = getDuration(game.promotions);

    if (checkStartDate(dateNow, duration.start)) {
      return true;
    } else {
      return false;
    }
  }).map(game => {
    const duration = getDuration(game.promotions);
    const originalPrice = game.price.totalPrice.fmtPrice.originalPrice;
    const discountPrice = game.price.totalPrice.fmtPrice.discountPrice;
    const effectiveDate = new Date(game.effectiveDate);
    const images = game.keyImages;

    return {
      title: game.title,
      url: `https://www.epicgames.com/store/en-US/product/${game.productSlug}`,
      author: {
        name: 'epicBot',
        icon_url: '',
        url: ''
      },
      description: '',
      thumbnail: '',
      fields: [
        { name: 'From: ', value: `${formatDate(duration.start)} - ${formatDate(duration.end)}`, inline: true },
        { name: '\u200b', value: '\u200b', inline: true },
        getGamePrices(discountPrice, originalPrice)
      ],
      image: images.find(image => image.type = 'OfferImageTall'),
      timestamp: new Date(),
      footer: {
        text: `Effective Date: ${formatDate(effectiveDate)}`
      }
    };
  });
}

module.exports = async function fetchGames() {
  let freeGames = [];
  try {
    const res = await fetch(URL);
    const data = await res.json();
    freeGames = data.data.Catalog.searchStore.elements;
  } catch (err) {
    console.log(err);
    return;
  }

  return embedFreeGames(freeGames);
};
