import express from "express";
import cors from 'cors'
import fetch from "node-fetch";

const app = express();
const port = 5000;

var corsOptions = {
  origin: '*',
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get("/feed/:page_number", cors(corsOptions),async (req, res) => {

  const pageNumber = req.params.page_number;
  const response = await fetch(
    `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${pageNumber}`
  );
  const data = await response.json();
  console.log(data);
 
  res.send(data.nodes);
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
