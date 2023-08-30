const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { User } = require('../model/User');

//user register
exports.register = async (req,res) => {
   try{
    const { universityId, password, role} = req.body;
    const existingUser = await User.findOne({ universityId })

    if(existingUser) {
      return res.status(400).json({ message: 'User already exists'})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      universityId, 
      password: hashedPassword, 
      role
    });

    await newUser.save()
    res.status(201).json({ message: "User registered sucessfully"})

   } catch(err ){
    res.status(500).json({ message: 'An error occured'})
   }
};

//User Login 
exports.login = async ( req,res) => {
  try {const { universityId, password } = req.body;

  const user = await User.findOne({ universityId });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ universityId, role: user.role }, 'secret_key', { expiresIn: '1h'});
  res.json({ token });
} catch (error) {
  res.status(500).json({ message: 'An error occurred' });
}
}



//logout  

exports.logout = async (req,res) => { 
  res
  .cookie('jwt', null, {
    expires: new Date(Date.now()), 
    httpOnly: true
  })
  .sendStatus(200)   
};
  

