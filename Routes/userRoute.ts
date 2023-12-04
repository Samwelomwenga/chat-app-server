import express from 'express'

import {registerUser} from '../Controllers/userConroller'

const router=express.Router();

router.post('/register',registerUser)
export default router;
