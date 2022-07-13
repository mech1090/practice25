const {validateField} = require('../validation/user.validation')
const userService = require('../service/user.service')
const becrypt = require('bcrypt')
const config = require('config')


const getLoginForm = (req,res)=>{
    return res.render('login/layout')
}

const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = validateField(fields)
    if(error){
        return res.render('login/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(!findUser){
        return res.render('signup/layout',{message:'User does not exits Signup'})
    }
    const matchPassword = await becrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Wrong Credentials'})
    }
    return res.render('user/layout')
}

const getSignupForm = (req,res)=>{
    return res.render ('signup/layout')
}

const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = validateField(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(findUser){
        return res.render('login/layout',{message:'User Exist Login Here'})
    }
    const hashPassword = await becrypt.hash(password,config.get('hash.salt'))
    const createUser = await userService.createEntries({email,password:hashPassword})
    return res.render('signup/layout',{message:'User Created'})
}

module.exports = {getLoginForm,login,getSignupForm,signup}