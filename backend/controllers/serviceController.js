const Service = require("../models/Service.js");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services", error: err });
  }
};

const getOwnerServices = async (req, res) => {
  try {
    const services = await Service.find({ owner: req.user._id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch services", error: err });
  }
};

const createService = async (req, res) => {
  const { name, description, price, features } = req.body;
  try {
    const service = await Service.create({
      name,
      description,
      price,
      features,
      owner: req.user._id,
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: "Failed to create service", error: err });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.owner.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete service", error: err });
  }
};

module.exports = {
  getAllServices,
  getOwnerServices,
  createService,
  deleteService
};
