const Booking = require("../models/Booking.js");
const Service = require("../models/Service.js");

const createBooking = async (req, res) => {
  const { serviceId, date } = req.body;
  try {
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const booking = await Booking.create({
      serviceId,
      userId: req.user._id,
      date,
      status: "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate("serviceId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err });
  }
};

const getOwnerBookings = async (req, res) => {
  try {
    const services = await Service.find({ owner: req.user._id });
    const serviceIds = services.map(service => service._id);
    const bookings = await Booking.find({ serviceId: { $in: serviceIds } })
      .populate("serviceId")
      .populate("userId", "name email mobile");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err });
  }
};

const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const service = await Service.findById(booking.serviceId);
    if (service.owner.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking", error: err });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getOwnerBookings,
  updateBookingStatus
};
