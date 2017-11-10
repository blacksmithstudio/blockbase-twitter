const twitterAPI = require('node-twitter-api')

/**
 * Blockbase Twitter Driver
 * @namespace app.drivers.twitter
 * @author Alexandre Pereira <alex@blacksmith.studio>
 * @param {Object} app - app namespace to update
 *
 * @returns {Object} driver
 */
module.exports = (app) => {
    const Logger = app.drivers.logger
    const config = app.config.get('twitter')

    const twitter = new twitterAPI({
       consumerKey: config.consumerkey,
       consumerSecret: config.consumersecret,
       callback: config.callbackurl
    })

    return {
       async verify_token(access_token, access_secret){
           return new Promise((resolve, reject) => {
               twitter.verifyCredentials(access_token, access_secret, {}, (error, data, response) => {
                   if(error) return reject(error)
                   resolve(data)
               })
           })
       }
    }
 }
