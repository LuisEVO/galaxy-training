const express = require('express');
const router = express.Router();

const _workshop = require('./db')

router.get('/', (req, res, next) => {
    const workshop = _workshop.map(item => ({
        slug: item.slug,
        title: item.title,
        breif: item.brief,
        poster: item.poster
    }));
    res.status(200).json(workshop)
})

router.get('/:slug', (req, res, next) => {
    const slug = req.params.slug;
    const workshop = _workshop.find(item => item.slug === slug);
    if (workshop) {
        res.status(200).json({
            ... workshop
        })
    } else {
        res.status(404).json('workshop not found');
    } 
    
})

module.exports = router;
