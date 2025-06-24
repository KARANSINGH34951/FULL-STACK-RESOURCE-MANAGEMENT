import Event from "../model/planner.js";
import Resource from '../model/resource.js';
import User from "../model/User.js";
import sendEmail from "../utils/sendEmail.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      dateTime,
      location,
      status,
      isPublic,
      maxGuests,
      type,
    } = req.body;

    if (!title || !description || !dateTime || !location || !status || !type) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const newEvent = new Event({
      title,
      description,
      dateTime,
      location,
      status,
      isPublic,
      maxGuests,
      type,
    });

    const savedEvent = await newEvent.save();

    // Find all clients
    const clients = await User.find({ role: "CLIENT" });
    const emails = clients.map((client) => client.email);

    const subject = "📢 New Event Scheduled!";
    const text = `
Hello!

A new event has been scheduled:

📌 Title: ${title}
🗓 Date & Time: ${new Date(dateTime).toLocaleString()}
📍 Location: ${location}

Stay tuned for more updates!

- Event Management Team
`;

    if (emails.length > 0) {
      await sendEmail(emails.join(","), subject, text);
    }

    return res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error.message);
    return res.status(500).json({ error: "Failed to create event" });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    return res.status(500).json({ error: "Failed to delete event" });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    dateTime,
    location,
    status,
    isPublic,
    maxGuests,
    type,
  } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        dateTime,
        location,
        status,
        isPublic,
        maxGuests,
        type,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error.message);
    return res.status(500).json({ error: "Failed to update event" });
  }
};

export const addResource = async (req, res) => {
  try {
    const { name, type, quantity, availability, description } = req.body;

    if (!name || !type || quantity == null) {
      return res.status(400).json({ error: "Name, type, and quantity are required." });
    }

    const newResource = new Resource({
      name,
      type,
      quantity,
      availability,
      description
    });

    const saved = await newResource.save();
    return res.status(201).json(saved);
  } catch (error) {
    console.error("Error adding resource:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
