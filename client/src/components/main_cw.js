const Record = require('../../../connect_cw');
const express = require('express');
const app = express();
const axios = require('axios');
var newsTitleVar, newsSourceVar, newsAuthorVar, newsPublishedAtVar;
var wordVar, phoneticVar, meaningVar;
const apikey = 'b9fb6b7d359440749a8963b42d8db1db';

app.get('/getnews', (req, res)=>{
    const title = req.query.title;
    const sort = req.query.sort;
    const querystr = `https://newsapi.org/v2/everything?q=${title}&sortBy=${sort}&apiKey=${apikey}`;

    axios.get(querystr).then((response)=>{
        newsTitleVar = response.data.articles[0].title;
        newsSourceVar = response.data.articles[0].source.name;
        newsAuthorVar = response.data.articles[0].author;
        newsContentVar = response.data.articles[0].content;
        newsPublishedAtVar = response.data.articles[0].publishedAt;

        const querystr = `https://api.dictionaryapi.dev/api/v2/entries/en/${title}`;

        axios.get(querystr).then((response)=>{
            
            searchWordVar = title;
            phoneticVar = response.data[0].phonetics[0].text;
            meaningVar = response.data[0].meanings[0].definitions[0].definition;

            newsData = new Record ({
                newsTitle:newsTitleVar,
                newsSource:newsSourceVar,
                newsAuthor:newsAuthorVar,
                newsContent:newsContentVar,
                newsPublishedAt:newsPublishedAtVar,
                searchWord:searchWordVar,
                phonetic:phoneticVar,
                meaning:meaningVar
            });
        
            res.send("<p><b>Title:</b></p>" + newsTitleVar + "</br><p><b>Source:</b></p>" + newsSourceVar + "</br><p><b>Author:</b></p>" + newsAuthorVar + "</br><p><b>Content:</b></p>" + newsContentVar + "</br><p><b>Publish Date:</b></p>" + newsPublishedAtVar + 
            "</br></br><p><b>Search Word:</b></p>" + searchWordVar + "</br><p><b>Phonetic:</b></p>" + phoneticVar + "</br><p><b>Meaning:</b></p>" + meaningVar);
    
            newsData.save().then(result=>{
                console.log("Success" + result);
            }).catch(()=>{
                console.log("Error");
            });
        });
    });
});

app.get('/deletenewsviasource', (req, res)=>{

    const source = req.query.source;
    const newsSource = source;

    res.send("Articles from " + newsSource + " are deleted");

    Record.deleteMany ({newsSource: newsSource}, function (err) {
        if (err) return handleError(err);
    });
});

app.get('/deletenewsviaword', (req, res)=>{

    const word = req.query.word;
    const searchWord = word;

    res.send("Articles searched with word: " + searchWord + " are deleted");

    Record.deleteMany ({searchWord: searchWord}, function (err) {
        if (err) return handleError(err);
    });
});

app.listen(5000);