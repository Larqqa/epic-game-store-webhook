const http = require('http');
const express = require('express');
const app = express();
require('dotenv').config();
const fetch = require('node-fetch');
const fetchGames = require('./fetchGames');

const jwtToken = ('X-JWT-Token').toLowerCase();

/**
 * Route for messaging the free games to a set channel.
 *
 * By sending the correct JWT token to the route,
 * the bot sends the promotions to the channel.
 *
 * Can also be used for uptime monitoring.
 */
app.get('/', async (req, res) => {
  if (req.headers[jwtToken] === process.env.SECRET) {
    try {
      fetch(process.env.WEBHOOK,
        {
          method: 'POST',
          body: JSON.stringify({ embeds: await fetchGames() }),
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  res.sendStatus(200);
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
