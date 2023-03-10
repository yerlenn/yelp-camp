const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 200; i++) {
        const random1 = Math.floor(Math.random() * 1000) + 1;
        const random2 = Math.floor(Math.random() * descriptors.length);
        const random3 = Math.floor(Math.random() * places.length);
        const randomPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6401e858a9f183494ce19088',
            title: `${descriptors[random2]} ${places[random3]}`,
            location: `${cities[random1].city}, ${cities[random1].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1].longitude, 
                    cities[random1].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dsggr2akw/image/upload/v1678005284/YelpCamp/kkjw5kxoub6vk7dceube.jpg',
                    filename: 'YelpCamp/xl2g4zto7qveuhjq86l1',

                },
                {
                    url: 'https://res.cloudinary.com/dsggr2akw/image/upload/v1678083430/YelpCamp/b2bbknbsmnxrwuv46w1t.jpg',
                    filename: 'YelpCamp/kkjw5kxoub6vk7dceube',

                }
            ],
            price: randomPrice
        })
        await camp.save();
    }
}

seedDB();