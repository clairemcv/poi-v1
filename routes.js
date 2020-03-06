'use strict';

const Accounts = require('./app/controllers/accounts');
const Poi = require('./app/controllers/poi');
//const poidetail = require('./app/models/poidetail');


module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },

    { method: 'GET', path: '/home', config: Poi.home },
    { method: 'GET', path: '/locations', config: Poi.locations },
    //{ method: 'DELETE', path: '/poidetail/{id}', config: poidetail.deleteOne },
    { method: 'POST', path: '/deleteOne', config: Poi.deleteOne },
    { method: 'POST', path: '/createPoi', config: Poi.createPoi },



    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: { auth: false }
    }
];