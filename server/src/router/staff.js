import { getMyAllocatedEvents,getAllStaff,markEventCompleted } from '../controller/staff.js';
import express from "express";
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router=express.Router();

router.get('/my-events', authenticateToken, authorizeRoles('STAFF'), getMyAllocatedEvents);
router.get('/getstaff', authenticateToken, authorizeRoles('PLANNER'), getAllStaff);

router.put('/event/:id/complete', authenticateToken, authorizeRoles('STAFF'), markEventCompleted);

export default router;