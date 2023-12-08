import express from 'express'

import {registerUser, loginUser, findUser, findUsers} from '../Controllers/userConroller'

const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/find/:userId',findUser)
router.get('/',findUsers)

export default router;
