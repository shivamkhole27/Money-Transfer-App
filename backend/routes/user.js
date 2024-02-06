const express = require("express");
const zod = require("zod");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares");
const { Account, User } = require("../db");
const router = express.Router();

const signupSchema = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    lastName : zod.string(),
    firstName : zod.string()
})

router.post("/signup", async (req, res) => {
    const body = req.body
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        return res.json({
            message : "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username : body.username,
    })

    if(existingUser){
        return res.status(411).json({
            message : "Username already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName
    })

    const userId = user._id;

    /// ---- Create new account ---- ////

    await Account.create({
        userId,
        balance : 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)


    res.json({
        message : "User Created Successfully",
        token : token
    })
})


const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})


router.post("/signin", (req, res) => {

    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })
    }

    const user = User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET)

        res.json({
            token : token
        })
    }

    res.json({
        message : "Error! while logging in"
    })
})


const updateUser = zod.object({
    password : zod.string().optional(),
    lastName : zod.string().optional(),
    firstName : zod.string().optional()
})


router.put("/", authMiddleware, async (req, res) => {
    const {success} = updateUser.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id : req.user._id
    })


    res.json({
        message : "Updated Successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter ||  ""

    const users = await User.find({
        $or: [
                { firstName: { "$regex": filter } },
                { lastName: { "$regex": filter } }
            ]
    })

    res.json({
        user : users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})

module.exports = router;