import express from 'express';
import { createEvent,getEvents,addResource } from '../controller/planner.js'


const router = express.Router();

router.post('/create-event',createEvent);
router.get('/get-event',getEvents);
router.post('/add-resource', addResource);


export default router;
