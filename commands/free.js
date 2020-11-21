const fetch = require('node-fetch');
const URL = 'https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions';

/**
 * Send embed messages about free games.
 */
module.exports.run = async (client, message, args) => {
  let freeFlag = '';

  if (args.length > 1) {
    await message.channel.send('Error: Too many argments.');
    return;
  } else if (args.length === 1) {
    if (args[0]==='now' || args[0]==='next') {
      freeFlag = args[0];
    } else {
      await message.channel.send('Error: Incorrect argument.');
      return;
    }
  } else {
    freeFlag = 'all';
  }

  let freeGames = await fetch(URL)
    .then(response => response.json())
    .then((data) => {
      return data.data.Catalog.searchStore.elements;
    })
    .catch(err => console.log(err));

  /**
   * Get the duration of the discount.
   * @param {array} promotions
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
   * @param {string} delimiter
   * @return {string} The formatted string
   */
  function formatDate(date, delimiter) {
    return date.getDate() + delimiter + (date.getMonth() + 1) + delimiter + date.getFullYear();
  }

  for (const game of freeGames) {
    const dateNow = new Date();
    const duration = getDuration(game.promotions);
    const willSend = dateNow < duration.start && freeFlag === 'now' || dateNow > duration.start && freeFlag === 'next'
      ? false
      : true;

    if (willSend) {
      const originalPrice = game.price.totalPrice.fmtPrice.originalPrice;
      const discountPrice = game.price.totalPrice.fmtPrice.discountPrice;
      const effectiveDate = new Date(game.effectiveDate);

      const price = discountPrice === '0' ?
        { name: 'Discount Price:', value: 'FREE', inline: true }
        : discountPrice === originalPrice ?
          { name: 'Price:', value: originalPrice, inline: true }
          : { name: 'Discount Price:', value: discountPrice, inline: true };

      const delimiter = '.';
      const startDate = formatDate(duration.start, delimiter);
      const endDate = formatDate(duration.end, delimiter);
      const gameArriveDate = formatDate(effectiveDate, delimiter);
      const images = game.keyImages;
      const gameImage = images.find(image => image.type = 'OfferImageTall');

      const embedFreeGame = {
        color: '#0099ff',
        title: game.title,
        url: `https://www.epicgames.com/store/pt-BR/product/${game.productSlug}`,
        author: {
          name: 'epicBot',
          icon_url: '',
          url: ''
        },
        description: '',
        thumbnail: '',
        fields: [
          { name: 'From: ', value: `${startDate} - ${endDate}`, inline: true },
          { name: '\u200b', value: '\u200b', inline: true },
          price
        ],
        image: gameImage,
        timestamp: new Date(),
        footer: {
          text: `Available from : ${gameArriveDate}`
        }
      };

      //Send message
      await message.channel.send({ embed: embedFreeGame });
    }
  }
};
