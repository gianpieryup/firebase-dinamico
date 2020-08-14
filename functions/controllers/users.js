const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.json({"status": "picante la cancha pERRO"})

})

module.exports = router;