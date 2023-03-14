import { Router } from "express";
import passport from "passport";
import '../passport/passportStrategies.js'

const usersRouter = Router()

//passport

usersRouter.post('/signup', passport.authenticate('signup',{
    failureRedirect: '/errorSignup',
    successRedirect: '/login',
    passReqToCallback: true,
    })
)

usersRouter.post('/login', passport.authenticate('login',{
    failureRedirect: '/errorLogin',
    passReqToCallback: true,
    })
    ,(req, res)=>{
        // console.log('user:', req)
        req.session.email = req.user.email
        req.session.first_name = req.user.first_name
        req.session.last_name = req.user.last_name
        req.session.age = req.user.age
        for (const key in req.body) {
            req.session[key] = req.body[key]
        }
        req.session.logged = true
        if(req.session.email === 'adminCoder@coder.com' && req.session.password === 'adminCod3r123'){
            req.session.admin = true
            req.session.user = false
            req.session.role = 'Admin'
        }else{
            req.session.admin = false
            req.session.user = true
            req.session.role = 'User'
        }
        if (req.session.admin === true) {
            res.redirect('/admin');
        } else {
            res.redirect('/products')
        }
    }
)


// login con github

usersRouter.get(
    '/loginGithub',
    passport.authenticate('githubLogin', { scope: ['user:email'] })
  );

usersRouter.get(
    '/github',
    passport.authenticate('githubLogin', { failureRedirect: '/errorLogin' }),
    async (req, res) => {
        req.session.email = req.user.email;
        req.session.first_name = req.user.first_name;
        req.session.last_name = req.user.last_name;
        req.session.age = req.user.age;
        req.session.logged = true
        if(req.session.email === 'adminCoder@coder.com' && req.session.password === 'adminCod3r123'){
        req.session.admin = true
        req.session.user = false
        req.session.role = 'Admin'
    }else{
        req.session.admin = false
        req.session.user = true
        req.session.role = 'User'
    }
    if (req.session.admin === true) {
        res.redirect('/admin');
    } else {
        res.redirect('/products')
    }
    }
);




usersRouter.get('/logout', (req, res)=>{
    req.session.destroy((error)=>{
        if (error){
            console.log(error)
        }else{
            res.redirect('/login')
        }
    })
})

export default usersRouter