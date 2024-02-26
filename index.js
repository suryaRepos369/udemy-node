const express = require('express')
const app = new express ();
const mongoose = require ('mongoose')
const dbConnect = require('./db/db')
const blogRouter = require('./router/blog/router')
dbConnect();
app.use(express.json())
app.use('/blog',blogRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});