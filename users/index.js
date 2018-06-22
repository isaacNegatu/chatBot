let User = require('../model/user');

let userID = '';
let name = '';

module.exports = (req) =>{
  
  let getUserInfo = ()=>{
    return new Promise((res, rej) =>{
      
      userID = req.body.originalRequest.data.sender.id;
    });

  }
  
  let searchIfExists = ()=>{
    
    
    
    
  }
  
  
  getUserInfo()
  .then(()=>{
    
    let newUser = new User
  
  });
  
}

