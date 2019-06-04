const redis = require('redis');
const client = redis.createClient(6379);
var usermodel = require('../models/users');
exports.login = function(req, res)
{
    var username = req.body.user_name.trim();
    var userpass = req.body.user_pass.trim();
    res.setHeader('Content-Type', 'application/json');
    if(username && userpass != "")
    {
         var user_response = usermodel.loginmodel(req.body);
         res.send(user_response);
    }
    else
    {
        res.send(JSON.stringify({ msg: "Username & Password should not be blank!" }));
    }
    
}


exports.signup = function(req, res) {
    res.send('I am a signup page to create user request');
}

exports.userlist = async function(req, res)
{
    var user_id = req.params.user_id;
    if(user_id != "")
    {
        var userlistmodelresponce = await usermodel.userlistmodel(user_id);
        console.log(userlistmodelresponce+"I am here");
        res.send(userlistmodelresponce);
    }
    else
    {
        res.send("User Id should not blank");
    }
    
}

exports.logout = async function(req, res)
{
    var token_id = req.body.token_id.trim();
    var user_name = req.body.user_name.trim();

    if(token_id && user_name != "")
    {
        var logoutmodelresponce = await usermodel.logoutmodel(req.body);
        return(logoutmodelresponce);
    }
    else
    {
        res.send("Token Id and Username should not be blank!");
    } 
}
