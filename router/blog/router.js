const express = require('express');
const router = express.Router();
const Blog = require('./../../models/blog.model')
router.get('/list', async(req,res)=>{
    try {
        const data = await Blog.find({});
        if(data&&data.length>0){
            res.send(data)
        }
        else{
            res.send({
                response:'No data found'
            })
        }

    } catch (error) {
        console.log(error)
        res.send('Error')
    }
   
})

router.post('/addList', async (req, res) => {
  try {
    const reqBody = req.body
    const newData = new Blog(reqBody)
    const a = await newData.save()
    res.status(201).send(a)
  } catch (error) {
    res.status(404).send(error)
  }
})



module.exports = router;