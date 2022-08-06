const express = require ("express");
const router = express();

router.use("/api/users", require("./UserRoutes.js"));
router.use("/api/photos", require("./PhotoRoutes"));

//teste route
router.get("/",(req,res) =>{
    res.send("API working!");
})

module.exports = router;