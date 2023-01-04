import { ActivityType, Client } from 'discord.js';
import stockList from './stockList';
import yahooFinance from 'yahoo-finance2';

export default async function setBotsPresence(clients: Client[], mainClient: Client) {
  const yahooResults = await Promise.all(stockList.map(s => yahooFinance.quote(s.fullSymbol)));
  const mainClientGuild = mainClient.guilds.cache.get(process.env.GUILD_ID!);

  yahooResults.forEach(async (res, i) => {
    const guild = clients[i].guilds.cache.get(process.env.GUILD_ID!);

    const isPositive = res.regularMarketChange !== undefined && res.regularMarketChange >= 0;
    const plusSign = isPositive ? '+' : '';
    const arrowEmoji = isPositive ? '🔼' : '🔽';

    const nameString = `${stockList[i].displaySymbol} @ ${res.regularMarketPrice?.toFixed(2)}`;

    const statusString =
      `${plusSign}${res.regularMarketChange?.toFixed(2)} ` +
      `${arrowEmoji} ${plusSign}${res.regularMarketChangePercent?.toFixed(2)}%`;

    // set nickname and status
    clients[i].user?.setActivity(statusString, { type: ActivityType.Watching });
    guild?.members.me?.setNickname(nameString);

    // check red role
    const hasRedRole = (await guild?.members.me?.fetch())?.roles.cache.has(
      process.env.RED_ROLE_ID!
    );

    // add/remove the red role
    if (isPositive && hasRedRole) {
      mainClientGuild?.members.removeRole({
        user: clients[i].user!.id,
        role: process.env.RED_ROLE_ID!,
      });
    } else if (!isPositive && !hasRedRole) {
      mainClientGuild?.members.addRole({
        user: clients[i].user!.id,
        role: process.env.RED_ROLE_ID!,
      });
    }
  });
}
