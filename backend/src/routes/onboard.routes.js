import { Router } from "express"
// import { middle } from "../app.js"

const router = Router()

router.post("/student", (req, res) => { })
router.post("/instituion", (req, res) => { })

router.get("/test",  (req, res) => {
    console.log(req.user)
    res.status(200).json({ message: "test" })
})

export default router