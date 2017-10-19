const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken');

app.get('/', cors(), (req, res) => {

    const state = req.query.state;
    const token = req.query.token;

    jwt.verify(req.query.token, 'secrwet', function(err, decoded) {

        let validJWT = true;

        if (err) {

            if (err.message === 'invalid token') {

                validJWT = false;

            }

        }
        
        if (validJWT) {

            res.redirect(`${state}?token=${token}`);
            
        } else {

            res.json({message: 'invalid JWT'});

        }
        

    });

})

const port = process.env.PORT || 3000;

app.listen(port, () => {

    console.log(`ON. Port: ${port}`)

})