var Cryptr = require('cryptr');
const redis = require('redis');
const client = redis.createClient(6379);
const uuidv1 = require('uuid/v1');

const connection  = require('../config/config');
function loginmodel(obj)
{
     if(obj.user_name  == 'admin' && obj.user_pass == "admin")
     {
        var user_name = obj.user_name;  
        var user_pass = obj.user_pass;
        var token_id  = 'wp-token-'+"19a4c6d0-7ad6-11e9-af9c-552d9e988e35";
        var wp_uuid   =  "wp-uuid-"+uuidv1();
        var userobj   = "{'user_name':"+user_name+"'user_pass:'"+user_pass+"}";
       // console.log(user_name);
        client.set(wp_uuid, user_name)
        client.hmset("hmset_key",wp_uuid, user_name, function(err, reply)
        {
           if(err)
           {
                   throw err;
           }
        });
        client.set(token_id, user_name);
     }
     else
     {
                return "Username & Password Does Not Match!";
     }

}


function logoutmodel(obj)
{
        //return new Promise((resolve, reject) => {
        client.keys('*', function (err, keys, values) {
                if (err) return console.log(err);
              
                for(var i = 0, len = keys.values; i < len; i++) {
                  console.log(values[i]);
                }
              }); 
      //  });        

}

function userlistmodel(user_id)
{
        return new Promise((resolve, reject) => {
                connection.query("SELECT * FROM e2e_users where user_id="+user_id, function (err, result, fields) {
                        //if (err) throw err;
                        
                        if(result.length>0)
                        {
                                
                                var finalarray  = [];
                                var finalobj  = {};
                                result.forEach(function(resultdata){
                                        finalobj.user_id = resultdata.user_id
                                        finalobj.user_name = resultdata.user_name
                                        finalobj.status = resultdata.status
                                        finalarray.push(finalobj);
                                });
                               // console.log(finalarray);
                               // client.set(userlistkey, JSON.stringify({ finalarray }));
                                resolve(finalarray);
                        }
                        else
                        {
                                reject("Record Not Found");
                        }
                });
        });      
}
module.exports = { loginmodel,userlistmodel, logoutmodel }
