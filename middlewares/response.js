const apiResponse = require('../utils/ApiResponse')
const responseFormatter=(err, req, res, next)=>{
    console.log('*****************response formattter is ', res)
    res.apiSuccess = (data) => {
        console.log('success************')
      };

      next();
    
}

module.exports = responseFormatter;