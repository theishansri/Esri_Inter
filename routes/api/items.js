const router = require('express').Router();
const Items = require('../../Models/Items-Model')

router.get('/', async (req, res) => {
    try {
        let x = await Items.find().select('-_id').sort({ ItemName: 1 })
        res.json(x)
    } catch (error) {
        res.status(401).json({ msg: "Server Error" })
    }
});
router.post('/', async (req, res) => {
    try {
        const newItem = new Items({
            ItemName: req.body.ItemName,
            ItemPrice: req.body.ItemPrice,
            Quantity: req.body.Quantity
        })
        let x = await newItem.save();
        res.json(x)


    } catch (error) {
        res.status(401).json({ msg: "Server Error" })
    }
})
module.exports = router;