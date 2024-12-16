
const axios = require("axios")
const db=require("../sequelize/index.js")
const { response } = require("express")



module.exports={

paymentWalletFlouci : async (req,res)=>{
    const url='https://developers.flouci.com/api/generate_payment'

    const payload={
        "app_token": "6423e894-688e-4005-9eab-1fa8dfd1ea21", 
    "app_secret": process.env.FLOUCI_SECRET,
    "amount":req.body.amount,
    "accept_card": "true",
    "session_timeout_secs": 1200,
    "success_link": "http://192.168.100.4:8080/api/redirect", 
    "fail_link": "http://192.168.100.4:8080/api/redirect",
    "developer_tracking_id": "e39466b5-c72e-4495-9bcf-e958a6baa68e"
    } 
    await axios.post(url, payload)
    .then((response)=>{res.send(response.data) ;console.log(response.data)})
    .catch((err)=>console.log(err))

},

verify:async (req,res)=>{



await axios.get(`https://developers.flouci.com/api/verify_payment/${req.params.id}`,{headers : {
    'Content-Type': 'application/json',
    'apppublic': "6423e894-688e-4005-9eab-1fa8dfd1ea21",
    'appsecret': process.env.FLOUCI_SECRET
  }})
    .then((response)=>res.send(response.data))

    .catch((err)=>console.log(err))


}
   
} 