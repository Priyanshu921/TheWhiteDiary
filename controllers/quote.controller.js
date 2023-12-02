import { quote } from "../models/quotes.js";

export const getRandomQuote = async(req,res) => {
    const noOfQuotes = await quote.count();
    const selectedQuote = await quote.findOne().skip(Math.floor(Math.random() * noOfQuotes))
    if (!selectedQuote) {
      return res.status(400).send({
        statusCode: 403,
        error: "No Quotes exist",
        data: {},
        message: "",
      });
    }
    return res.status(200).send({
      statusCode: 200,
      error: "",
      data: selectedQuote,
      message: "",
    });
}