const express = require('express');
const { Todoinsert, Todoread, Tododelete, Todorow, Todoupdate } = require('../../controller/web/todoController');
const router = express.Router();


router.post("/insert", Todoinsert)
router.get("/read", Todoread)
router.delete("/delete/:id", Tododelete)
router.get("/single/:id", Todorow)
router.put("/update/:id", Todoupdate)


module.exports = router;