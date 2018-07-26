module.exports = function(app, passport) {

// normal routes ===============================================================

    // twitch -------------------------------

        // send to twitch to do the authentication
        app.get('/auth/twitch', passport.authenticate('twitch', 
            { scope :
             ['user_read'] 
            }
         ));

        // handle the callback after twitch has authenticated the user
        app.get('/auth/twitch/callback',
            passport.authenticate('twitch', {
                successRedirect : 'http://localhost:8080/LinkAccounts?auth=twitch&code=success',
                failureRedirect : 'http://localhost:8080/LinkAccounts?auth=twitch&code=failure'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : 'http://localhost:8080/LinkAccounts?auth=twitter&code=success',
                failureRedirect : 'http://localhost:8080/LinkAccounts?auth=twitter&code=failure'
            }));

    // reddit ---------------------------------
        // send to reddit to do the authentication
        app.get('/auth/reddit',
            passport.authenticate('reddit', {
                state: 'fsdfdsafdffsa',
                duration: 'permanent',
                scope: 'identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote'
            }));

        // the callback after reddit has authenticated the user
        app.get('/auth/reddit/callback',
            passport.authenticate('reddit', {
                successRedirect : 'http://localhost:8080/LinkAccounts?auth=reddit&code=success',
                failureRedirect : 'http://localhost:8080/LinkAccounts?auth=reddit&code=failure'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // twitch -------------------------------

        // send to twitch to do the authentication
        app.get('/connect/twitch', passport.authorize('twitch', { scope :'user_read' }));

        // handle the callback after twitch has authorized the user
        app.get('/connect/twitch/callback',
            passport.authorize('twitch', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // reddit ---------------------------------

        // send to reddit to do the authentication
        app.get('/connect/reddit', passport.authorize('reddit'));

        // the callback after google has authorized the user
        app.get('/connect/reddit/callback',
            passport.authorize('reddit', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================

    // twitch -------------------------------
    app.get('/unlink/twitch', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.twitch.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/reddit', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.reddit.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
