const express = require("express");

const urlRoute = require("./routes/url");
const {  mongoose } = require("mongoose");
const URL = require('./models/url');

const app = express();
const port = 4001;

mongoose.connect('mongodb://localhost:27017/Sortner')
.then(()=> console.log(' Database is connected'))
.catch((err)=> console.log(err, 'Database is not connected'));

// middleware
app.use(express.json());

app.use('/url', urlRoute);

app.get('/shortId', async(req, res)=>{
    const shortId = req.params.shortId;
   const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push:{
        visitHistory: {
            timestamp: Date.now(),
        },
    }});
   res.redirect(entry.redirectURL)
})

app.listen(port, () => console.log(` App listening on port ${port}!`));
