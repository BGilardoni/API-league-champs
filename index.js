const port = process.env.port || 4000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const champs = []
let title=""

axios.get('https://www.leagueoflegends.com/en-us/champions/')
    .then((response)=>{
        const html = response.data;
        const $ = cheerio.load(html);
        var obj = {
            "name": "",
            "url": "",
        }
        $('a',html).each(function(){
            obj.name = $(this).text()
            obj.url = "https://www.leagueoflegends.com/en-us/champions" + $(this).attr('href')
            champs.push({
                "name": obj.name,
                "url": obj.url
            });
        });
    });

app.get('/', (req,res) =>{
    res.json('Welcome to my league of legends champions api')
})

app.get('/champions', (req,res) =>{
    res.json(champs)
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});