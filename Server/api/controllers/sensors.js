const mongoose = require("mongoose");
const Sensor = require("../models/sensor");

exports.sensors_get_all = (req, res) => {
  Sensor.find({},function(err,task){
    if(err)
    res.send(err);
    res.json(task);
  });

};

exports.sensors_get_sensor = (req, res, next) => {
  const id = req.params.sensorId;
  Sensor.findById(id)
    .select("_id name equipment_id description sensor_param_1 sensor_param_2 sensor_param_3 sensor_param_4 sensor_param_5 sensor_param_6")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          sensor: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/sensors"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sensors_get_params_and_update = (req, res) => {

  const id = req.params.sensorId;

  const sensor_param_1 = req.query.sensor_param_1;
  sensor_param_2 = req.query.sensor_param_2;

  console.log(id);
  console.log(sensor_param_1);
  console.log(sensor_param_2);

  const updateOps = {"sensor_param_1" : sensor_param_1,
                    "sensor_param_2" : sensor_param_2};

  Sensor.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Sensor updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/sensors/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.sensors_create_sensor = (req, res, next) => {
  const sensor = new Sensor({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    equipment_id: req.body.equipment_id,
    description: req.body.description,
    sensor_param_1: req.body.sensor_param_1,
    sensor_param_2: req.body.sensor_param_2,
    sensor_param_3: req.body.sensor_param_3,
    sensor_param_4: req.body.sensor_param_4,
    sensor_param_5: req.body.sensor_param_5,
    sensor_param_6: req.body.sensor_param_6,
  });
  sensor
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created sensor successfully",
        createdSensor: {
          _id: result._id,
          name: result.name,
          equipment_id: result.equipment_id,
          description: result.description,
          sensor_param_1: result.sensor_param_1,
          sensor_param_2: result.sensor_param_2,
          sensor_param_3: result.sensor_param_3,
          sensor_param_4: result.sensor_param_4,
          sensor_param_5: result.sensor_param_5,
          sensor_param_6: result.sensor_param_6,
          request: {
            type: "GET",
            url: "http://localhost:3000/sensors/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.sensors_update_sensor = (req, res, next) => {
  const id = req.params.sensorId;
  const updateOps = {};

  //Method 1: Patch/Put in this way: 
  //[{"propName":"like", "value":"10"}]

  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value;
  // }

  //Method 2.0: Patch/Put in this way: 
  //{"like":"10"}

  // for (const key of Object.keys(req.body)) {
  //   updateOps[key] = req.body[key]
  // }
  
  //Method 2.1: Patch/Put in this way: 
  //{"like":"10"}
  for (const key in req.body) {
    updateOps[key] = req.body[key];
  }

  Sensor.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Sensor updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/sensors/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.sensors_delete = (req, res, next) => {
  const id = req.params.sensorId;
  Sensor.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Sensor deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/sensors",
          body: { name: "String" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
