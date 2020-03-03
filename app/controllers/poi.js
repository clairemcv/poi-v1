'use strict';

const PoiDetail = require('../models/poidetail');
const User = require('../models/user');
const Mongoose = require('mongoose');

const Poi = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Add a POI' });
        }
    },
    locations: {
        handler: async function(request, h)  {
            try {
                const poi = await PoiDetail.find().populate('creator').lean();
                return h.view('locations', {
                    title: 'Locations to Date',
                    poi: poi
                });
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },
    createPoi: {
        handler: async function (request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const newPoiDetail = new PoiDetail({
                    name: data.name,
                    location: data.location,
                    description: data.description,
                    creator: user._id
                });
                await newPoiDetail.save();
                return h.redirect('/locations');
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }
    },

    deletePoi: {
        handler: async function (request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                PoiDetail.findByIdAndDelete(ObjectId);
                return h.redirect('/locations');
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }
    }

};

module.exports = Poi;