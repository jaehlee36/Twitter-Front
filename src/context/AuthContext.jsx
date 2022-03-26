import {
  createContext,
  createRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import Header from "../components/Header";
import Login from "../pages/Login";
import AuthService from "../service/auth";

const AuthContext = createContext({});

const contextRef = createRef();

export class AuthErrorEventBus {
  constructor() {
    this.callback = null;
  }
  listen(callback) {
    this.callback = callback;
  }
  notify(error) {
    this.callback(error);
  }
}
const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useImperativeHandle(contextRef, () => (user ? user.token : undefined));

  useEffect(() => {
    authErrorEventBus.listen((err) => {
      console.log(err);
      setUser(undefined);
    });
  }, []);

  useEffect(() => {
    authService.me().then(setUser).catch(console.error);
  }, []);

  const signUp = useCallback(
    async (username, password, name, email, url) =>
      authService
        .signup(username, password, name, email, url)
        .then((user) => setUser(user)),
    []
  );

  const logIn = useCallback(
    async (username, password) =>
      authService.login(username, password).then((user) => setUser(user)),
    []
  );

  const logout = useCallback(
    async () => authService.logout().then(() => setUser(undefined)),
    []
  );

  const context = useMemo(
    () => ({
      user,
      signUp,
      logIn,
      logout,
    }),
    [user, signUp, logIn, logout]
  );

  return (
    <AuthContext.Provider value={context}>
      {user ? (
        children
      ) : (
        <div className="app">
          <Header />
          <Login onSignUp={signUp} onLogin={logIn} />
        </div>
      )}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export const fetchToken = () => contextRef.current;
