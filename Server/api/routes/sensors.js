const express = require("express");
const router = express.Router();
const multer = require('multer');
const SensorsController = require('../controllers/sensors');

router.get("/", SensorsController.sensors_get_all);

router.get("/:sensorId", SensorsController.sensors_get_sensor);

router.get("/update/:sensorId", SensorsController.sensors_get_params_and_update);

router.post("/", SensorsController.sensors_create_sensor);

//router.patch("/:sensorId", SensorsController.sensors_update_sensor);

router.put("/:sensorId", SensorsController.sensors_update_sensor);


router.delete("/:sensorId", SensorsController.sensors_delete);

module.exports = router;
