const mongoose = require('mongoose');

const sensorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: false },
    equipment_id: { type: String, required: false},
    description: { type: String, required: false },
    sensor_param_1: { type: Number, required: false, default:0},
    sensor_param_2: { type: Number, required: false, default:0},
    sensor_param_3: { type: Number, required: false, default:0},
    sensor_param_4: { type: Number, required: false, default:0},
    sensor_param_5: { type: Number, required: false, default:0},
    sensor_param_6: { type: Number, required: false, default:0},

});

module.exports = mongoose.model('Sensor', sensorSchema);