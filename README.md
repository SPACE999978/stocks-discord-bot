# Stocks Discord Bot

Requires Node.js 16.9.0+

A bot that changes the nickname, status and the roles of 3 (or more) bots to match the stocks listed in `src/stockList.ts`

1. Create 3 bots on https://discord.com/developers/applications, when inviting to the server, all of them should have the `Change Nickname` permission, and one needs a `Manage Roles` permission, this will be the first bot in the token list (see point 4)
2. Clone the repository

```
git clone https://github.com/deimoss123/stocks-discord-bot.git
```

3. Create a `.env` file at the project root level (next to `package.json`)
4. Add environment variables to the `.env` file:

```
TOKEN1=""
TOKEN2=""
TOKEN3=""

GUILD_ID=""
RED_ROLE_ID=""
```

4. Install dependencies

```
npm ci
```

5. Build the project

```
npm run build
```

6. Run it

```
npm start
```
