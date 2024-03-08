const express = require("express");
const router = express.Router();
const { loginUserSchema } = require("./../../validations/newUser.js");
const validateBody = require("../../middlewares/validate.js");
const catchAsync = require("../../utils/catchAsync.js");
const httpStatus = require("http-status");
const ApiResponse = require("../../utils/ApiResponse.js");
const { login, refreshAuthToken } = require("../../services/auth/auth.js");
const getBearerToken = require("../../utils/BearerToken.js");
const authMiddleware = require("../../middlewares/auth.js");
const { authLimiter } = require("../../middlewares/rateLimiter.js");
const config = require("../../config/config.js");
// const openai = require ('openai')
// const {Configuration , OpenAIApi} = require('openai');
// const auth = require("../../middlewares/auth.js");
// router.use(auth);

// const openai = new OpenAIApi(new Configuration({
//     apiKey:config.openai
// }))

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: config.openai,
});

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    try {
      // Extract the question from the request body
      const question = req.body.question || "You are a helpful assistant.";

      // Set up SSE headers
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      // const aiResponse = await openai.chat.completions.create({
      //     messages: [{ role: "system", content: question }],
      //     model: "gpt-3.5-turbo",
      // });

      // console.log(aiResponse)

      // // Extract and send the AI response
      // res.write(`AI Response: ${aiResponse.choices[0].message.content}\n\n`);

      let ans = [
        "creating",
        "custom",
        "response",
        "for",
        "you ",
        "query ",
        "please ",
        "wait ",
        "some",
        "time",
      ];

      for (let i = 0; i < 70; i++) {
        await new Promise((resolve) => setTimeout(resolve, (i * 10) % 40));
        res.write(ans[i % 10]);
      }

      res.end();
    } catch (error) {
      console.error("Error:", error);
      new ApiResponse(
        httpStatus.INTERNAL_SERVER_ERROR,
        "An error occurred",
        "",
      );
    }
  }),
);

// router.get(
//     "/",
//     catchAsync(async (req, res, next) => {

//         // const question = req.body.question || "You are a helpful assistant.";

//         try {
//             res.write('creating the streaming response.....\n')
//             await new Promise((resolve)=>setTimeout(resolve,1000))
//             res.write('first step: jai shree ram')
//             await new Promise((resolve)=>setTimeout(resolve,1000))
//             res.write('second step: narayana')
//             await new Promise((resolve)=>setTimeout(resolve,1000))
//             res.write('third step: krishnaa')
//             res.end();

//         } catch (error) {
//             console.error('Error:', error);
//             res.json(new ApiResponse(httpStatus.INTERNAL_SERVER_ERROR, "An error occurred", ''));
//         }
//     })
// );
router.get(
  "/",
  catchAsync(async (req, res) => {
    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      // Send initial data
      res.write("data: creating the streaming response.....\n\n");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Send additional data in intervals
      for (let i = 1; i <= 3; i++) {
        res.write(`data: Step ${i}: `);

        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        res.write(`${i}jai shree ram\n\n`);
      }

      // End the response
      res.end();
    } catch (error) {
      console.error("Error:", error);
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(
            httpStatus.INTERNAL_SERVER_ERROR,
            "An error occurred",
            "",
          ),
        );
    }
  }),
);

module.exports = router;
1;
