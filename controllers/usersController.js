const https = require('https')

let get = function(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
  
        let data = '';
        res.on('data', function(chunk){
            data += chunk;
        });
    
        res.on('end', function(){
          let d = JSON.parse(data);
          resolve(d)
        });
    
        res.on('error', (e) => {
          reject(e)
        })
    
      })
    }) 
  }

module.exports.getUsers = async function() {
    let users = await get('https://jsonplaceholder.typicode.com/users')
    return users
}