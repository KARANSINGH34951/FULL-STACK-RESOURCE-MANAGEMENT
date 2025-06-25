import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  requirements: {
    type: String 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resourcesAllocated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    }
  ],staffAssigned: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
}

});

const Event = mongoose.model('Event', eventSchema);

export default Event;
