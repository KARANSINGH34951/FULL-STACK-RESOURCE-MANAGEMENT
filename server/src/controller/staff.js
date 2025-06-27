import Event from '../model/Event.js';
import Resource from '../model/Resource.js';
import User from '../model/User.js';

export const getMyAllocatedEvents = async (req, res) => {
  try {
    const staffId = req.user.id;

    const events = await Event.find({ staffAssigned: staffId })
      .populate('clientId', 'email')
      .sort({ date: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching allocated events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    // Find staff already assigned to any **non-completed** event
    const assignedStaffIds = await Event.find({ 
      status: { $ne: 'Completed' },
      assignedStaff: { $ne: null }
    }).distinct('assignedStaff');

    // Return only staff who are NOT assigned to an active event
    const availableStaff = await User.find({
      role: 'STAFF',
      _id: { $nin: assignedStaffIds }
    }).select('_id email');

    res.status(200).json(availableStaff);
  } catch (err) {
    console.error('Error fetching staff:', err);
    res.status(500).json({ message: 'Failed to fetch staff' });
  }
};

export const markEventCompleted = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId).populate('resourcesAllocated');

    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Verify the staff assigned matches
    if (event.staffAssigned?.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // 1. Update resource quantities
    for (let resource of event.resourcesAllocated) {
      const dbResource = await Resource.findById(resource._id);
      dbResource.quantity += 1; // or use allocated quantity if tracked
      await dbResource.save();
    }

    // 2. Update event status and deallocate staff
    event.status = 'Completed';
    event.staffAssigned = null;
    event.resourcesAllocated = []; // optional if you want to clear it
    await event.save();

    res.status(200).json({ message: 'Event marked as completed and resources released' });
  } catch (err) {
    console.error('Error marking event as completed:', err);
    res.status(500).json({ message: 'Server error while completing event' });
  }
};

