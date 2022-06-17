const router = require('express').Router();
const passport =require('passport');


router.get('/login/failed',(req,res)=>{
    res.status(401).json({
        success: false, 
        message: "failure",

    });
});

router.get('/login/success',(req,res)=>{
    if(req.user){
        // res.status(200).json({
        //     success: true,
        //     message: "successfull",
        //     user:req.user,
        //     //cookies: req.cookies
        // });
        res.send(req.user);
        console.log(req.user)
        console.log(req.user.displayName);
    }else{
        console.log("Login With Google has failed")
    }
});

router.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('http://localhost:3000/')
})

router.get('/google', passport.authenticate("google", {scope: ["profile"]}));

router.get("/google/callback" , passport.authenticate("google",{
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/faild"
}))

module.exports = router;