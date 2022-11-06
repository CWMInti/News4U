const mongoose = require('mongoose');

const db = "mongodb+srv://P19010969:yiUq4qprYfWXIPic@cluster1.4u0qawv.mongodb.net/news4u?retryWrites=true&w=majority";

mongoose.connect(db).then(()=>{
    console.log("Connected to database");
}).catch(()=>{
    console.log("Error Connecting to database");
})

const SchemaOne = new mongoose.Schema({
    newsTitle: {type: String},
    newsSource: {type: String},
    newsAuthor: {type: String},
    newsContent: {type: String},
    newsPublishedAt: {type: String},
    searchWord: {type: String},
    phonetic: {type: String},
    meaning: {type: String}
});

const News = mongoose.model('newsData', SchemaOne);
module.exports = News;