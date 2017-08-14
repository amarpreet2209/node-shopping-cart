var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shopping', { useMongoClient: true });

var products = [new Product({
        imagePath: 'https://www.callofduty.com//content/dam/atvi/callofduty/wwii/home/wwii-fb-eyes-logo-pic.jpg',
        title: 'Call of Duty WW2',
        description: 'First Person Shooter!!!',
        price: 15
    }),
    new Product({
        imagePath: 'http://cdn.pcwallart.com/images/max-payne-3-wallpaper-4.jpg',
        title: 'Max Payne 3',
        description: 'Third Person Shooter!!!',
        price: 20
    }),
    new Product({
        imagePath: 'http://www.tsbgamers.org/wp-content/uploads//2016/06/store_image_02.png',
        title: 'Counter Strike : Global Offensive',
        description: 'First Person Shooter!!!',
        price: 25
    }),
    new Product({
        imagePath: 'https://i.ytimg.com/vi/fNC66njKCV8/maxresdefault.jpg',
        title: 'Need For Speed - Most Wanted',
        description: 'Racing!!!',
        price: 17
    }),
    new Product({
        imagePath: 'http://ll-c.ooyala.com/e1/FxZnluYjE6hEoFHu02TdwQqWA8tlkcwv/promo322349625',
        title: 'Grand Theft Auto V',
        description: 'Action-Adventure!!!',
        price: 40
    }),
    new Product({
        imagePath: 'http://images.performgroup.com/di/library/sporting_news/81/df/pro-evolution-soccer-2017_isrooi069kfi1709d8m5n9l90.jpg?t=855964271',
        title: 'Pro Evolution Soccer 2017',
        description: 'Sports!!!',
        price: 23
    })
]

var done = 0;
for(var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if(done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}
