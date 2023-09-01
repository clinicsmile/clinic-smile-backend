const controller = {};

controller.Auth = (req,res)=>{
    console.log(req.body);
    res.send({Token:"123456789"});
}


module.exports = controller;