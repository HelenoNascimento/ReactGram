const User = require("../models/User");


const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// generate user Token
const generateToken = (id) =>{
    return jwt.sign({id}, jwtSecret,{
        expiresIn: "20d",
    });
};

// register user and sing in
const register = async(req,res) =>{
    
    const {name, email, password} = req.body

    //checando se usuario existe
    const user = await User.findOne({email})

    if(user){
        res.status(422).json({errors: ["Por favor, utilize outro e-mail"]});
        return
    }
    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });;

    // if user was created sucessfully, return the token
    if(!newUser){
        res.status(422).json({errors: ["houve um erro, por favor tente mais tarde "]})
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });

    
};

//Sing user in
    const login = async(req, res) =>{
        const {email, password} = req.body

        const user = await User.findOne({email});

        // checa se existe
        if(!user){
            res.status(404).json({errors: ["usuario não encontrado."]});
            return;
        }

        //checa a senha
        if(!(await bcrypt.compare(password, user.password))){
            res.status(422).json({errors: ["senha invalida"]})
            return
        }
        // return user with token
        
        
        res.status(201).json({
            _id: user._id,
            profileImage: user.profileImage,
            token: generateToken(user._id),
        });


    }
            //Get Current logged in user
            const getCurrentUser = async(req, res) =>{
                const user = req.user

                res.status(200).json(user);
            }

            // Update user
const update = async (req, res) => {
    const { name, password, bio } = req.body;
  
    let profileImage = null;
  
    if (req.file) {
      profileImage = req.file.filename;
    }
  
    const reqUser = req.user;
  
    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
      "-password"
    );
  
    if (name) {
      user.name = name;
    }
  
    if (password) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }
  
    if (profileImage) {
      user.profileImage = profileImage;
    }
  
    if (bio) {
      user.bio = bio;
    }
  
    await user.save();
  
    res.status(200).json(user);
  };

            //get user by id
            const getUserById = async(req, res) =>{
                const {id} = req.params

               try {
                const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password")
                 //check if user exists
                 if(!user){
                    res.status(404).json({errors: [ "usuario nao encontrado"]})
                    return
                }
                res.status(200).json(user);

               } catch (error) {
                res.status(422).json({errors: [ "usuario nao encontrado"]})
                return
               }

               
             
            }

module.exports ={
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
};