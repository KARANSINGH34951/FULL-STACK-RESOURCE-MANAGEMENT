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
    const staff = await User.find({ role: 'STAFF' }).select('-password');
    res.status(200).json(staff);
  } catch (err) {
    console.error('Error fetching staff:', err);
    res.status(500).json({ message: 'Failed to fetch staff' });
  }
};
