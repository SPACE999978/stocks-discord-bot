import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import setBotsPresence from './setBotPresence';
import stockList from './stockList';

dotenv.config();

const clients = stockList.map(() => new Client({ intents: [GatewayIntentBits.Guilds] }));
const mainClient = clients[0];

// in milliseconds, 60_000 = 1 minutes, currently 10 minutes
const UPDATE_INTERVAL = 600_000;

mainClient.once('ready', async () => {
  // 2 second interval to make sure all bots are ready
  setTimeout(() => setBotsPresence(clients, mainClient), 2000);
  setInterval(() => setBotsPresence(clients, mainClient), UPDATE_INTERVAL);
});

clients.forEach((client, i) =>
  client
    .login(process.env[`TOKEN${i + 1}`])
    .then(() => console.log(`${client.user?.tag} logged in`))
);
