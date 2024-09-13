
const db=require("../sequelize/index.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
module.exports={
register: function(req,res){
  db.user.count({where:{email:req.body.email}}).then((response)=>{
    if(response!==0){
        res.status(400).send("email deja exist")
    }else{
    bcrypt.hash(req.body.password,10).then((hashpass)=>{
        db.user.create({
            email:req.body.email,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            password:hashpass,
            role:req.body.role
        }).then((response)=>{
            let token=jwt.sign({email:response.email,id:response.id,firstname:response.firstname,lastname:response.lastname,role:response.role},"my code daezdjzechkjzekl")
            res.send({token:token,infor:response})
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
    db.user.findOne({where:{email:req.body.email}}).then((response)=>{
        if(!response){
            res.send("email is not valid")
        }else{
            bcrypt.compare(req.body.password,response.password).then((samepass)=>{
                if(samepass){
                let token=jwt.sign({email:response.email,id:response.id,firstname:response.firstname,lastname:response.lastname,role:response.role},"my code akjdezjekldamzdlid")
               
               
                res.send({token:token})
               
            
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
    db.user.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (!user) {
                return res.send("Invalid user");
            }

            // If current password is provided, check if it matches the stored password
            if (req.body.CurrentPassword) {
                bcrypt.compare(req.body.CurrentPassword, user.dataValues.password)
                    .then((samePassword) => {
                        if (samePassword) {
                            // If new password is provided, hash it and update
                            if (req.body.newPassword) {
                                bcrypt.hash(req.body.newPassword, 10)
                                    .then((passwordHashed) => {
                                        db.user.update({
                                            username: req.body.username,
                                            password: passwordHashed,  // Update 'password' field
                                            location: req.body.location,
                                            photoDeprofile: req.body.photo,
                                            phoneNumber: req.body.phone,
                                            instagram: req.body.instagram
                                        }, { where: { id: req.params.id } })
                                            .then((result) => res.send("Profile updated successfully with new password"))
                                            .catch((err) => res.status(500).send(err)); // Handle update error
                                    })
                                    .catch((err) => res.status(500).send(err)); // Handle hashing error
                            } else {
                                // Update user without password change
                                db.user.update({
                                    username: req.body.username,
                                    location: req.body.location,
                                    photoDeprofile: req.body.photo,
                                    phoneNumber: req.body.phone,
                                    instagram: req.body.instagram
                                }, { where: { id: req.params.id } })
                                    .then((result) => res.send("Profile updated successfully"))
                                    .catch((err) => res.status(500).send(err)); // Handle update error
                            }
                        } else {
                            return res.send("Your current password is incorrect");
                        }
                    })
                    .catch(() => res.status(500).send("Error comparing passwords"));
            } else {
                // If no password change, just update other fields
                db.user.update({
                    username: req.body.username,
                    location: req.body.location,
                    photoDeprofile: req.body.photo,
                    phoneNumber: req.body.phone,
                    instagram: req.body.instagram
                }, { where: { id: req.params.id } })
                    .then((result) => res.send("Profile updated successfully"))
                    .catch((err) => res.status(500).send(err)); // Handle update error
            }
        })
        .catch((err) => res.status(500).send(err)); // Handle findOne error
}
}