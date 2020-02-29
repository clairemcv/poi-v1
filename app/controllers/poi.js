'use strict';

const Poi = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Add a POI' });
        }
    },
    locations: {
        handler: function(request, h) {
            return h.view('locations', {
                title: 'Your Points of Interest',
                poi: this.poi
            });
        }
    },
    createpoi: {
        handler: function(request, h) {
            let data = request.payload;
            data.creator = this.currentUser;
            this.poi.push(data);
            return h.redirect('/locations');
        }
    }
};

module.exports = Poi;