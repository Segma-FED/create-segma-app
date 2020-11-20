import { AuthChecker } from '@segma/api-tools';
import { AuthStrategy } from '../../api/api';

export default AuthChecker({
    autoLogout: true,
    logout() {
        AuthStrategy().onUnatuhorized();
    }
});
