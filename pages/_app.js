import "../styles/globals.css";
import AuthStateChange from "../Layouts/AuthStateChange";
import StateProvider from "../Hooks/StateProvider";
import { initialState, reducer } from "../Hooks/Reducer";

function MyApp({ Component, pageProps }) {
  return (
    <AuthStateChange>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </AuthStateChange>
  );
}

export default MyApp;
