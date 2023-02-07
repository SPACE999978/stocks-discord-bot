import { Client, GatewayIntentBits } from 'discord.js';
import setBotsPresence from './setBotPresence';
import stockList from './stockList';
import validateEnv from './validateEnv';
import 'dotenv/config';
import chalk from 'chalk';

if (!validateEnv()) process.exit(1);

const clients = stockList.map(() => new Client({ intents: [GatewayIntentBits.Guilds] }));
const mainClient = clients[0];

// in milliseconds, 60_000 = 1 minutes
const UPDATE_INTERVAL = 60_000;

mainClient.once('ready', () => {
  // 2 second delay to make sure all bots are ready
  setTimeout(() => setBotsPresence(clients, mainClient), 2_000);
  setInterval(() => setBotsPresence(clients, mainClient), UPDATE_INTERVAL);
});

clients.forEach((client, i) =>
  client
    .login(process.env[`TOKEN${i + 1}`])
    .then(() => console.log(`${chalk.green(`[TOKEN${i + 1}]`)} ${client.user?.tag} logged in`))
    .catch(() => {
      console.log(`${chalk.red('INVALID TOKEN')} - TOKEN${i + 1}`);
      process.exit(1);
    })
);
