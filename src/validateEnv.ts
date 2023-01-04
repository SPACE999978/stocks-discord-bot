export default function validateEnv(): boolean {
  const requiredEnvVars = ['TOKEN1', 'TOKEN2', 'TOKEN3', 'GUILD_ID', 'RED_ROLE_ID'];
  let isValid = true;

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(`MISSING ENVIRONMENT VARIABLE - ${envVar}`);
      isValid = false;
    }
  }

  return isValid;
}
