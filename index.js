 import express from 'express';

 const app = express();


 app.set("view engine",'ejs')
app.use(express.urlencoded({extended:true}))

 app.get("/login",(req,resp)=>{
    resp.render("login")
 })

 app.post("/profile",(req,resp)=>{
    resp.setHeader('set-cookie',"login=true")
    resp.setHeader('set-cookie',"name="+req.body.name)
    resp.render("profile")
 })

 app.get("/",(req,resp)=>{
    let cookiesData = req.get('cookie');

    cookiesData = cookiesData.split(";")
    cookiesData = cookiesData[2].split("=");

    console.log(cookiesData[1])

    resp.render('home',{name:cookiesData[1]})
 })

 app.listen(3200);