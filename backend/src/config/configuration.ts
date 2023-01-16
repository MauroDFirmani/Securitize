export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  MONGO_HOST: process.env.MONGO_HOST,
  ETHERSCAN_BASE_URL: process.env.ETHERSCAN_BASE_URL,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
});
