import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/router"
import { auth } from '../firebase';

export function withPublic(Component) {
    return function WithPublic(props) {
        let [user] = useAuthState(auth)

        let Router = useRouter()

        if (user) {
            Router.replace("/")
            return <div id="Gloader"></div>
        }
        return <Component {...props} />
    }
}

export function withPrivate(Component) {
    return function WithPrivate(props) {
        let [user] = useAuthState(auth)
        let Router = useRouter()

        if (!user) {
            Router.replace("/login?redirected=true")
            return <div id="Gloader"></div>
        }

        return <Component {...props} user={user} />
    }
}