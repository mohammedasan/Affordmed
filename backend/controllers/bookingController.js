const Booking = require("../models/Booking.js");
const Service = require("../models/Service.js");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");

const createBooking = async (req, res) => {
  const { serviceId, date } = req.body;

  try {
    const service = await Service.findById(serviceId).populate("owner", "name email");
    if (!service) return res.status(404).json({ message: "Service not found" });

    const booking = await Booking.create({
      serviceId,
      userId: req.user._id,
      date,
      status: "pending",
    });

    // Email to customer
    const customerMsg = `
      Hello ${req.user.name},

      Your booking for "${service.name}" is confirmed.
      Your bike will delivered by Durai Saami from  ${service.owner.name} Shop (Phone: 87687634534).

      Service Date: ${new Date(date).toLocaleDateString()}
    `;
    await sendEmail(req.user.email, "Booking Confirmation", customerMsg);

    // Email to owner
    const ownerMsg = `
      Hello ${service.owner.name},

      You have a new booking from ${req.user.name} (${req.user.email}).
      Service Date: ${new Date(date).toLocaleDateString()}.

      Please prepare for their visit.
    `;
    await sendEmail(service.owner.email, "New Booking Received", ownerMsg);

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ message: "Booking failed" });
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

// const updateBookingStatus = async (req, res) => {
//   const { status } = req.body;
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     const service = await Service.findById(booking.serviceId);
//     if (service.owner.toString() !== req.user._id.toString())
//       return res.status(401).json({ message: "Not authorized" });

//     booking.status = status;
//     await booking.save();
//     res.json(booking);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update booking", error: err });
//   }
// };

const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("serviceId", "name owner")
      .populate("userId", "name email");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const service = await Service.findById(booking.serviceId._id).populate("owner", "email name");
    if (service.owner._id.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    booking.status = status;
    await booking.save();

    // If completed, send "bike arriving" email to customer
    if (status === "completed") {
      await sendEmail(
        booking.userId.email,
        "Service Completed",
        `Hello ${booking.userId.name},

Your booking for the service "${booking.serviceId.name}" is now marked as **Completed**.

Your bike is arriving.

Thank you for choosing us!`
      );
    }

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
