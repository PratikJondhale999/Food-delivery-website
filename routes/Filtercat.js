const express = require('express');
const VegModel = require('../models/categories/VegModel');
const SouthIndianModel = require('../models/categories/SouthIndianModel');
const ItalianModel = require('../models/categories/ItalianModel');
const NonVegModel = require('../models/categories/NonVegModel');
const fooditem = require('../models/fooditem');

const router = express.Router();

router.get('/filter', async (req, res) => {
    const { category,minPrice, maxPrice} = req.query;
    let query = {};

    // Build the price range query
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    let filteredItems = [];
    try {
        switch (category) {
            case 'Veg':
                filteredItems = await VegModel.find();
                break;
            case 'Non-Veg':
                filteredItems = await NonVegModel.find();
                break;
            case 'South Indian':
                filteredItems = await SouthIndianModel.find();
                break;
            case 'Italian':
                filteredItems = await ItalianModel.find();
                break;
            default:
                return res.status(400).send('Invalid category');
        }
        const totalPages = 0;
        const limit = 4;

        res.render('filtercat', { allfood: filteredItems, totalPages, limit });
    } catch (error) {
        console.error('Error fetching food items:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
