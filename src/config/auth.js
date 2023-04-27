module.exports = {
  jwt: {
    secret: process.env.AUTO_SECRET_KEY || 'default',
    expiresIn: '1d'
  }
}