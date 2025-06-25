import Event from '../model/Event.js';
import Resource from '../model/Resource.js';
import User from '../model/User.js';

export const getMyAllocatedEvents = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the resource entry linked to the logged-in staff user
    const staffResource = await Resource.findOne({ userId });

    if (!staffResource) {
      return res.status(404).json({ message: 'No resource found for this staff member' });
    }

    // Find events where this resource is allocated
    const events = await Event.find({
      resourcesAllocated: staffResource._id
    }).populate('resourcesAllocated');

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching staff events:', error);
    res.status(500).json({ message: 'Failed to fetch allocated events' });
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
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(eventId);

    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (!event.assignedStaff || event.assignedStaff.toString() !== userId) {
      return res.status(403).json({ message: 'You are not assigned to this event' });
    }

    event.status = 'Completed';
    await event.save();

    res.status(200).json({ message: 'Event marked as completed ✅' });
  } catch (err) {
    console.error('Error ending event:', err);
    res.status(500).json({ message: 'Failed to end event' });
  }
};


