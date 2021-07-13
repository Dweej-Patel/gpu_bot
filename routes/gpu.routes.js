const express = require('express');
const controller = require('../controller/gpu.controller');

const router = express.Router();

router.post("/add", controller.add_gpu);
router.get("/get_all", controller.get_all_gpu);
router.patch("/update", controller.update_gpu);

module.exports = router;