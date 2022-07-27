const asyncHandler = require("express-async-handler");
const got = require("got");

const processImage = asyncHandler(async(image) => {
    const apiKey = process.env.imagga_api_key;
    const apiSecret = process.env.imagga_api_secret;
    const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(image);
    try{
        const response = await got(url, {username: apiKey, password: apiSecret});

        return JSON.parse(response.body);
    } catch(error) {
        console.log(error.response.body);
        return {error: "Something went wrong check log for more details"};
    }     
});

module.exports = {processImage};