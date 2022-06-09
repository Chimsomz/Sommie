const jwt = require('jsonwebtoken');
const { userSchema } = require('../model/user');

function check (req, res, next) {
    //consolelog(req.headers);
    //return;
    if (req.headers.authorization) {
        //const token
        if(req.headers.authorization.split(" ")[0] == "Bearer") {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.jwtKey, function(err, payload) {
                if(err) console.log(err);
                userSchema.findOne({username: payload.username}, 'username', function (err, user) {
                    if(err) console.log(err);
                    if(!user){
                        res.send("User does not exist");
                    }else {
                        next();
                    }
                });
        
            });
        }
    } else {
        res.send("You are not allowed to access this route");
    }

}

module.exports = { check };


