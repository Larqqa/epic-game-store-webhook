Original work: [EpicDiscordBot](https://github.com/lucasrennok/EpicDiscordBot)

This script gets the free games discounts from Epic Game Store.
The script fetches the games from this [page](https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions).
When the server receives a GET request with the correct `X-JWT-Token` in the headers, it will send the fetched games as an embed to the configured Discord webhook.

Scripts:
`npm start`: To start the bot</br>
`npm run watch`: To start the dev server</br>
`npm run lint`: To lint the code</br>
`npm run lint:fix`: To lint and fix the code</br>

ENV (see: .env-template):
`WEBHOOK`: The URL for the Discord webhook</br>
`SECRET`: A secret token for sending automated messages of the discounts</br>
`PORT`: The servers port</br>