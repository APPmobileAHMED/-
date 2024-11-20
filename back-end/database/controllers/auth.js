
const db=require("../sequelize/index.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

module.exports={
register: function(req,res){
  db.users.count({where:{email:req.body.email}}).then((response)=>{
    if(response!==0){
        res.status(400).send("email deja exist")
    }else{
    bcrypt.hash(req.body.password,10).then((hashpass)=>{
        db.users.create({
            email:req.body.email,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            password:hashpass,
            role:req.body.role
        }).then((response)=>{
            let token=jwt.sign({email:response.email,id:response.id,firstname:response.firstname,lastname:response.lastname,role:response.role},"my code daezdjzechkjzekl")
            res.send({token:token,role:response.role})
        }).catch((error)=>{
            res.send(error)
        })
    }).catch((err)=>{
        console.log(err)
    })


    }
  })
},

login:(req,res)=>{
    db.users.findOne({where:{email:req.body.email}}).then((response)=>{
        if(!response){
            res.send("email is not valid")
        }else{
            bcrypt.compare(req.body.password,response.password).then((samepass)=>{
                if(samepass){
                let token=jwt.sign({email:response.email,id:response.id,firstname:response.firstname,lastname:response.lastname,role:response.role},"my code akjdezjekldamzdlid")
               
               
                res.send({token:token,role:response.role})
               
            
            }else{
                res.send("password invalid")
            }
            }).catch((err)=>{
                cosnole.log(err)
            })
        }
    }).catch((err)=>{
        res.send(err)
    })
},



updateprofile: (req, res) => {
    db.users.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (!user) {
                return res.send("Invalid user")
            }

            if(req.body.password){
                
                bcrypt.compare(req.body.password,user.dataValues.password)
                .then((samePassword) => {
                    if (samePassword) {
                        
                        if (req.body.newPassword) {
                            bcrypt.hash(req.body.newPassword, 10)
                                .then((passwordHashed) => {
                                    db.users.update({
                                        username: req.body.username,
                                        password: passwordHashed,  
                                        location: req.body.location,
                                        photoDeprofile: req.body.photoDeprofile,
                                        phoneNumber: req.body.phoneNumber,
                                        instagram: req.body.instagram
                                    }, { where: { id: req.params.id } })
                                        .then((result) => res.send("Profile updated successfully with new password"))
                                        .catch((err) => res.status(500).send(err)) 
                                })
                                .catch((err) => res.status(500).send(err)) 
                        } else {
                            
                            db.users.update({
                                username: req.body.username,
                                location: req.body.location,
                                photoDeprofile: req.body.photoDeprofile,
                                phoneNumber: req.body.phoneNumber,
                                instagram: req.body.instagram
                            }, { where: { id: req.params.id } })
                                .then((result) => res.send("Profile updated successfully"))
                                .catch((err) => res.status(500).send(err))
                        }
                    } else {
                        return res.send("wrong current password")
                    }
                })
                .catch(() => res.status(500).send("Error comparing passwords"))
            }else{
                db.users.update({
                    username: req.body.username,
                    location: req.body.location,
                    photoDeprofile: req.body.photoDeprofile,
                    phoneNumber: req.body.phoneNumber,
                    instagram: req.body.instagram
                }, { where: { id: req.params.id } })
                    .then((result) => res.send("Profile updated with successfull"))
                    .catch((err) => res.status(500).send(err))


            }

     
               
        })
        .catch((err) => res.status(500).send(err)) 
},

getUser:(req,res)=>{
    db.users.findOne({where:{id:req.params.id}}).then((result)=>{
        res.send(result)
    }).catch((err)=>{console.log(err)})

},
deleteuser:(req,res)=>{
    db.users.destroy({where:{email:req.params.email}}).then((result)=>{
        res.sendStatus(200);
    }).catch((err)=>{console.log(err)})
}

}