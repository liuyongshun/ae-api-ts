import router from '../../router';
import UserMsgController from '../../../controller/user';
router.post('/v1/home', UserMsgController.login);

export default router;
