const express   = require('express');
const monk      = require('monk');
const joi       = require('@hapi/joi');

const db        = monk(process.env.MONGO_URI);
const faqs      = db.get('faqs');

const schema = joi.object({
    question: joi.string().trim().required(),
    answer  : joi.string().trim().required(),
    videoUrl: joi.string().uri(),
})


const router = express.Router();

//READ ALL
router.get('/',async (req, res, next) => {
  
    try {
        const items = await faqs.find({});

        
        res.json(items);

    } catch (error) {
        next(error);
    }

});

//READ ONE
router.get('/:id', async (req, res, next) => {

    try {
        const { id } =  req.params;
        const item = await faqs.findOne({
            _id: id,
        });

        if(!item) return next();
        return res.json(item);
    }catch (error) {
        next(error);
    }
});

//CREATE ONE
router.post('/',async (req, res, next) => {
  try {
        const value = await schema.validateAsync(req.body);

        const inserted = await faqs.insert(value);

        res.json(inserted);
   } catch (error) {
        next(error)
   }
});

//UPDATE ONE
router.put('/:id', async (req, res, next) => {
  try {
        const { id } =  req.params;
        const item = await faqs.findOne({
            _id: id,
        });
        if(!item) return next();

        const value = await schema.validateAsync(req.body);

        const updated = await faqs.update({
            _id: id,
        },{
            $set: value,
        });

        res.json(updated);
   } catch (error) {
        next(error);
   }
});

//DELETE ONE
router.delete('/:id',async (req, res, next) => {
  try {
    const { id } =  req.params;

        await faqs.remove({ _id:id });
        res.json({
            message: 'sucess',
        })  
   } catch (error) {
        next(error);
   }
});

module.exports=router;