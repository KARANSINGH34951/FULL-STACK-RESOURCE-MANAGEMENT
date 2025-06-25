import { getMyAllocatedEvents,getAllStaff } from '../controller/staff.js';
import express from "express";
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router=express.Router();

router.get('/my-events', authenticateToken, authorizeRoles('STAFF'), getMyAllocatedEvents);
router.get('/staff', authenticateToken, authorizeRoles('PLANNER'), getAllStaff);


export default router;