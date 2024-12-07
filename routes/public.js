import express from "express"

const router = express.Router()

router.post('/cadastro', (req, res) => {
    const user = req.body

    res.status(201).json(user)
})

export default router

/* 
Username
phjs7626
Password
GTMykHPcUWR5VNpS

mongodb+srv://phjs7626:GTMykHPcUWR5VNpS@user.qixyb.mongodb.net/?retryWrites=true&w=majority&appName=user


*/