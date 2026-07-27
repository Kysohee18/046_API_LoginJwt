const express = require('express');
const router = express.Router();
const komikcontroller = require('../controller/komikController');
const usercontroller = require("../controller/userController");
const authMiddleware = require ("../middleware/authMiddleware");

router.post("/register", usercontroller.register);
router.post("/login", usercontroller.login);

//public
router.get('/komik',komikcontroller.getAllKomik);
router.get('/komik/:id',komikcontroller.getKomikById);
//private
router.post('/komik',komikcontroller.createKomik);
router.put('/komik/:id',komikcontroller.updateKomik);
router.delete('/komik/:id',komikcontroller.deleteKomik);

module.exports = router;
