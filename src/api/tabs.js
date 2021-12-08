import { Router } from 'express';
import {configure} from "./controllers/configure-controller";
import {calender} from "./controllers/calender-controller";

const router = Router();

// Static tabs
router.route('/calender').get(calender);

// Configuration tabs
router.route('/configure').get(configure);

export default router;
