const { Router } = require('express');
const { userRoutes } = require('../../user/routes');
const { authRoutes } = require('../../auth/authRoutes');
const { adminRoutes } = require('../../admin/routes');
const { userRequestRoutes } = require('../../userRequest/routes');
const { groupRoutes } = require('../../groups/routes');

const router = Router();

router.get('/', (
    req, res) => res.send('COMMARRAY APIs'));

router.use('/v1/user', userRoutes);
router.use('/v1/auth', authRoutes);
router.use('/v1/admin', adminRoutes);
router.use('/v1/register', userRequestRoutes);
router.use('/v1/group', groupRoutes);


module.exports = router;
