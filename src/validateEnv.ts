import chalk from 'chalk';

export default function validateEnv(): boolean {
  const requiredEnvVars: (keyof NodeJS.ProcessEnv)[] = [
    'TOKEN1',
    'TOKEN2',
    'TOKEN3',
    'TOKEN4',
    'TOKEN5',
    'GUILD_ID',
    'RED_ROLE_ID',
  ];

  let isValid = true;

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(chalk.red('MISSING ENVIRONMENT VARIABLE') + ` - ${envVar}`);
      isValid = false;
    }
  }

  return isValid;
}
