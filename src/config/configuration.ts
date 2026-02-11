
export default () => ({
  port: process.env.PORT || 3001,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    

  }
});