const { userSchema } = require ('../model/user');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

function register (req, res) {
    const { username, email, password, role } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userSchema({
        username, email, password: hashedPassword, role: 'user'
    });

    newUser.save(function(err) {
     if(err) console.log(err);
     
     res.send("User created successfully");
    });

}
 async function login(req, res) {
   const {username, password} = req.body;

  const user = await userSchema.findOne({username}, 'username password');
  const passwordsMatch = bcrypt.compareSync(password, user.password);
  if(!passwordsMatch) {
      res.send("Username or password is incorrect");
  } else {
     jwt.sign({username: user.username, role: user.role}, process.env.jwtKey, function(err, token) {
     res.send(token);
     });
    
 }
 }

module.exports = { register, login};
