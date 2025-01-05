import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();



app.get("/data/:username", (req, res) => {
  const username = req.params.username;
  async function fetchData() {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      const response2 = await fetch(`https://api.github.com/users/${username}/repos`);
      const data2 = await response2.json();
      // console.log(data);
      res.json({ msg: "ok" });
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const stringData = JSON.stringify(data);
      const stringDataRepos = JSON.stringify(data2);
      // console.log(stringData);
      

      const prompt = `Here's the GitHub data: ${stringData} and repo data ${stringDataRepos}. Create a brutally savage roast targeting any aspect—whether it's the user's bio, repositories, or anything else. Make it harsh and biting, but don't forget to include a disclaimer at the end, clarifying that it's all in good fun and purely meant as a joke.`;

      const result = await model.generateContent(prompt);
      console.log(result.response.text());
    } catch (error) {
      console.log(`error while fetching ${error}`);
    }
  }
  fetchData();
});

app.listen(3000, () => {
  console.log("app running on 3000");
});
