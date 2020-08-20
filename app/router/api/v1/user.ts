import router from '../../router';
import UserMsgController from '../../../controller/user';
router.post('/v1/login', UserMsgController.login);

export default router;
