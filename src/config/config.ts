export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,

  jwtSecret: process.env.JWT_SECRET,

  defUser: {
    userId: process.env.USER_ID,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  },

  httpClient: {
    timeout: process.env.TIMEOUT,
    maxRedirects: process.env.HTTP_MAX_REDIRECTS,
  },
});
