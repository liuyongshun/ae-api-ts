import router from './router';
import user from './api/v1/user';
import home from './api/v1/home';

router.use('/api', user.routes());
router.use('/home', home.routes());

export default router;
