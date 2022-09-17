const express = require('express');
const bp = require("body-parser")
const { default: axios } = require('axios');
require('dotenv').config()
//declaration
const PORT = 6000;
const app = express();

const EVNET=process.env.EVENT_HOST || '127.0.0.1:7000';  // please add IP + post name
//middelware
app.use(bp.json());

app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const {id,content,postId} =data;
        const status=content.includes("orange")?"rejected":"approved";
    
        await axios.post(`http://${EVNET}/events`, {
            type: "CommentModerated",
            data: {
                id: id,
                content,
                postId: postId,
                status
            }
        }).catch((err => console.log(err)));
    }

    res.status(200).send({ status: 'ok' });
});

//listenercd 
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
    console.log(`EVNET ip address is ${EVNET}`)
});