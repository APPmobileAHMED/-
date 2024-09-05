
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
            password:hashpass
        }).then((response)=>{
            let token=jwt.sign({email:response.email,id:response.id,firstname:response.firstname,lastname:response.lastname},"my code daezdjzechkjzekl")
            res.send({token:token,response:response})
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
                let token=jwt.sign({email:response.email,id:response.id,firstname:response.firstname,lastname:response.lastname},"my code akjdezjekldamzdlid")
               
               
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
}



}