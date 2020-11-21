const http = require('http');
const express = require('express');
const app = express();
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
require('dotenv').config();

app.get('/', (req, res) => {
  const dateNow = new Date();

  if (
    dateNow.getDay() === 4
    && (dateNow.getHours() - 3) === 19
    && dateNow.getMinutes() <= 25
  ) {
    const channel = client.channels.cache.get(process.env.CHANNEL);

    if(channel !== undefined){
      const commandFile = require('./commands/free.js');
      commandFile.run(client, { channel: channel }, []);
    }
  }

  res.sendStatus(200); // Send OK
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
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
    const commandFile = require('./commands/'+command+'.js');
    commandFile.run(client, message, args);
  } catch (err) {
    await message.channel.send(config.notFound);
  }
});

client.login(process.env.TOKEN);
