// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'twitchAuth' : {
        'clientID'        : '', // your App ID
        'clientSecret'    : '', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/twitch/callback'

    },

    'twitterAuth' : {
        'consumerKey'        : '',
        'consumerSecret'     : '',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'redditAuth' : {
        'clientID'         : '',
        'clientSecret'     : '',
        'callbackURL'      : 'http://localhost:8080/auth/reddit/callback'
    }

};
