import AppRoutes from "./routes";
import { SearchFunctionalProvider } from "./firstInterface/searchbar/search.context";

const App = () => {
  return (
    <div>
      <SearchFunctionalProvider>
        <AppRoutes route={AppRoutes} />
      </SearchFunctionalProvider>
    </div>
  );
};

export default App;
