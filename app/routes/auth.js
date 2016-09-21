var express = require("express");
var passport = require('passport');
var User = require("../models/user");
var router = express.Router();

module.exports.router = router;
module.exports.init = function(inject){

    router.get("/register",function(req,res){
        res.render("register");
    });

    router.post("/register",function(req,res,next){

        res.locals.req = req;

        req.name = req.body.name ? req.body.name.toString() : "";
        req.regNo = req.body.regNo ? req.body.regNo.toString().toUpperCase() : "";
        req.email = req.body.email ? eq.body.email.toString().toLowerCase() : "";
        req.contact = req.body.contact ? req.body.contact.toString() : "";
        req.gender = req.body.gender ? req.body.gender.toString().toLowerCase() : "";
        req.skills = req.body.skills ? req.body.skills.toString().split(",") : [];
        req.skills.forEach(function(skill,i){
            skills[i] = skill.toUpperCase().trim();
        });
        req.github = req.body.github ? req.body.github.toString() : "";
        req.linkedIn = req.body.linkedIn ? req.body.linkedIn.toString() : "";
        req.behance = req.body.behance ? req.body.behance.toString() : "";

        if(!/^[a-zA-Z ]+$/.test(req.name)){
            return res.render("register",{
                errField : "name"
            });
        }
        if(!/^\d\d\w\w\w\d\d\d\d$/i.test(req.regNo)){
            return res.render("register",{
                errField : "regNo"
            });
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(req.email)){
            return res.render("register",{
                errField : "email"
            });
        }
        if(!/^(\+91|91|\+91 |91 \d{9,11})?+$/.test(req.contact)){
            return res.render("register",{
                errField : "contact"
            });
        }

        next();
    },function(req, res) {
        User.register(new User({
            name : req.name,
            regNo : req.regNo,
            email : req.email,
            dateRegistered : new Date(),
            contact : req.contact,
            gender : req.gender,
            skills : req.skills,
            github : req.github,
            linkedIn : req.linkedIn,
            behance : req.behance
        }), req.body.password, function(err, user) {
            if (err) {
                req.flash("errMessage","Registration failed. Please recheck all the fields.");
                return res.redirect("/register");
            }else{
                req.flash("message","User registered successfully");
                return res.redirect("/register");
            }
        });
    });
}
