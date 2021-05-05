const router = require('express').Router();
const slug = require('slug');
const Portfolio = require('../models/Portfolio')


router.post('/', async (req, res) => {
    const portfolio = new Portfolio({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPortfolio = await portfolio.save()
        res.json({
            success: true,
            data: savedPortfolio
        })
    }catch(err){
        res.json({
            success: false,
            message: err
        })
    }
})

router.get('/', async (req, res) => {
    try{
        const portfolio = await Portfolio.find()
        res.json({
            success: true,
            data: portfolio    
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        })
    }
});

router.get('/:slug', async (req, res) => {
    try{
        const portfolio = await Portfolio.findOne({
            slug: req.params.slug
        })
        
        res.json({
            success: true,
            data: portfolio    
        });
    }catch(err){
        res.json({
            success: false,
            message: err
        })
    }
});

//update
router.patch('/:slug', async (req, res) => {
    try{
        const updatesPortfolio = await Portfolio.updateOne({
            slug: req.params.slug
        },
        {
            title: req.body.title,
            description: req.body.description 
        })
    
        res.json({
            success: true,
            updated: updatesPortfolio.nModified
               
        })

        console.log(updatesPortfolio);

    }catch(err){
        res.json({
            success: false,
            message: err
        })
    }
});


// Deletar
router.delete('/:slug', async (req, res) => {
    try{
        const deletedPortfolio = await Portfolio.deleteOne({
            slug: req.params.slug
        },
        {
            title: req.body.title,
            description: req.body.description 
        })
    
        res.json({
            success: true,
            updated: deletedPortfolio.deletedCount
               
        })

        console.log(updatesPortfolio);

    }catch(err){
        res.json({
            success: false,
            message: err
        })
    }
});



module.exports = router