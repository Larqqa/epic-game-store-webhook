Original work: [EpicDiscordBot](https://github.com/lucasrennok/EpicDiscordBot)

This bot gets the free games discounts from Epic Game Store.
The bot fetches the games from this [page](https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions).

Scripts:
`npm start`: To start the bot</br>
`npm run watch`: To start the dev server</br>
`npm run lint`: To lint the code</br>
`npm run lint:fix`: To lint and fix the code</br>

Commands:
`$free`: Shows current discounts</br>
`$free all`: Shows the current and future discounts</br>
`$free next`: Shows the future discounts</br>
`$help`: shows the bot commands</br>

ENV (see: .env-template):
`TOKEN`: This is the bot token</br>
`CHANNEL`: This is the ID of the channel you want the bot to run in</br>
`SECRET`: A secret token for sending automated messages of the discounts</br>

Config:
`prefix`: The prefix for the bot commands</br>
`port`: The port for the server</br>