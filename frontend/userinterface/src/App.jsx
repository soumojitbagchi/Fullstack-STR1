import AppRoutes from "./routes";
import { AuthProvider } from "./state/AuthContext";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <AppRoutes route={AppRoutes} />
      </AuthProvider>
    </div>
  );
};

export default App;
