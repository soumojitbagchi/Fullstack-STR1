import user from "../models/user.model.js";

const getMeController =async (req,res)=>{
    const decoded = req.user.id
    try {
       const userDetails = await user.findById(decoded)
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

export default {getMeController};