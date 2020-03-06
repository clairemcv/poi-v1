'use strict';


//import * as poiDetail from "mongoose/lib/model";

const PoiDetail = require('../models/poidetail');
const User = require('../models/user');
const Category = require('../models/category');



const Poi = {
    home: {
        handler: async function(request, h) {
            const categories = await Category.find().lean();
            return h.view('home', { title: 'Add a POI', categories: categories });
        }
    },
    locations: {
        handler: async function(request, h)  {
            try {
                const poi = await PoiDetail.find().populate('creator').populate('category').lean();
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

                const rawCategory = request.payload.category.lean();
                const category = await Category.findOne({
                    title: rawCategory
                });

                const newPoiDetail = new PoiDetail({
                    name: data.name,
                    location: data.location,
                    description: data.description,

                });
                await newPoiDetail.save();
                return h.redirect('/locations');
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }
    },

    deletePoi: {
       // auth: false,
        handler: async function(request, h) {
            try {
            const PoiDetail = request.payload;
            const id = request.auth.credentials.id;
            const user = await User.findById(id).lean();
            //let poiDetail = await.User.f;
            PoiDetail.findByIdAndRemove({ id: user.id });
            //await deletePoi.delete();
            deletePoi() ;
            //return h.redirect('/locations');
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }
    }

    };

//deletePoi.findByIdAndDelete({ id: user._id });


module.exports = Poi;

