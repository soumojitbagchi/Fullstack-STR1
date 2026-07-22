const user= require("../models/user.model")

const getMeController =async (req,res)=>{
    const decoded = req.user._id
    try {
       const userDetails = await user.findById({decoded})
    res.status(200).json({
        username:userDetails.user,
        email:userDetails.email
    }) 
    } catch (error) {
        res.status(500).json({
            message:"unable to fetch"
        })
    }
    
}

module.exports={getMeController}