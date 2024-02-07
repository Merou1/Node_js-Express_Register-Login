import express  from "express"
import bcrypt from 'bcrypt'
const app=express()
const port=3000

const users=[] //database

app.use(express.json())//json middleware

app.post("/register",async (req,res)=>{
    try{
        const {mail,password}=req.body
        //check if user already exists
        const findUser=users.find(user=>mail==user.mail
        )
        if(findUser) res.status(400).send("canno't use this user")

        //hash password
        const hashpassword=await bcrypt.hash(password,10) //10 saltrounds
        users.push({mail,password:hashpassword})
        console.log(users)
        res.status(201).send("Registered successfully")
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

app.post("/login",async (req,res)=>{
    try{
        const {mail,password}=req.body
        const findUser=users.find(user=>mail==user.mail)
        if(!findUser) res.status(400).send("Wrong mail or password")
        const passwordMatch=await bcrypt.compare(password,findUser.password)//ghathacher password w tcompareh mea finUser.password li deja hache(hua li kayn f db)
        if(passwordMatch) res.status(200).send("Logged in successfully")
        else{res.status(400).send("Wrong mail or password")} 
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})

app.listen(port,()=>{
    console.log("app is listening on port: "+port)
})
