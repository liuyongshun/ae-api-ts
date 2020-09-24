import router from '../../router';
import UserMsgController from '../../../controller/user';
router.post('/v1/login', UserMsgController.login);
router.post('/v1/register', UserMsgController.register);

export default router;
