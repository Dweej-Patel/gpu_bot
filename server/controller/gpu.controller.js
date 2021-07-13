const GPU_INFO = require("../models/gpu.model");

const filename = `${__dirname}/gpu_counter.json`;

const fs = require('fs');

const gpu_counter = require(filename);

const gpuinfo = (obj) => {
    return {
        customID: obj.customID,
        name: obj.name,
        url: obj.url,
        price_upper: obj.price_upper,
        description: obj.description
    }
}

exports.add_gpu = (req, res, next) => 
{
    if (! Object.keys(gpu_counter).includes(req.body.basename)) {
        res.status(400).json('Error: Invalid base gpu name.');
        return;
    }
    const gpu = {
        customID: req.body.basename + (gpu_counter[req.body.basename]++),
        name: req.body.name,
        url: req.body.url,
        price_upper: req.body.price_upper,
        description: req.body.description
    }
    const newGPU = new GPU_INFO(gpu);
    fs.writeFileSync(filename, JSON.stringify(gpu_counter));
    newGPU.save()
        .then(() => res.json('New GPU added.'))
        .catch(err => res.status(400).json('Error: '+err));
}

exports.get_all_gpu = (req, res, next) => 
{
    GPU_INFO.find()
        .then(gpus => res.json(gpus.map(gpu => gpuinfo(gpu))))
        .catch(err => res.status(400).json('Error: '+err));
}

exports.update_gpu = (req, res, next) =>
{
    GPU_INFO.findOneAndUpdate(
        {customID: req.body.customID},
        {
            name: req.body.name,
            url: req.body.url,
            price_upper: req.body.price_upper,
            price_lower: req.body.price_lower,
            description: req.body.description
        },
        {"omitUndefined": true}
    )
        .then(() => res.json("Updated!"))
        .catch(err => res.status(400).json("Unable to update."));
}


exports.find_and_buy = (req, res, next) =>
{

}