import { Router } from "express";
import passport from "passport";
const router = Router();

//google authentication routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_URL}/onboarding`);
    }
);

router.get("/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ user: req.user });
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

export default router;