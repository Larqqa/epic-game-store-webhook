const http = require('http');
const express = require('express');
const app = express();
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
require('dotenv').config();

const jwtToken = ('X-JWT-Token').toLowerCase();

/**
 * Route for messaging the free games to a set channel.
 *
 * By sending the correct JWT token to the route,
 * the bot sends the promotions to the channel.
 *
 * Can also be used for uptime monitoring.
 */
app.get('/', (req, res) => {
  if (req.headers[jwtToken] === process.env.SECRET) {
    console.log('sending message');

    const channel = client.channels.cache.get(process.env.CHANNEL);

    if (channel !== undefined) {
      const commandFile = require('./commands/free.js');
      commandFile.run(client, { channel: channel }, []);
    }
  }

  res.sendStatus(200);
});

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

client.on('ready', () => {
  console.log('Bot successfully started');
});

client.on('message', async message => {
  if (
    message.author.bot
    || message.channel.type === 'dm'
    || !message.content.startsWith(config.prefix)
  ) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    await message.channel.send('Command not found, try $help to get the available commands.');
  }
});

client.login(process.env.TOKEN);
