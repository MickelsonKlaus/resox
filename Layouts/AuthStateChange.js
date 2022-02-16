import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function AuthStateChange({ children }) {
    const [, loading] = useAuthState(auth);

    if (loading) {
        return <div id="Gloader"></div>
    }

    return children;
}

export default AuthStateChange;
