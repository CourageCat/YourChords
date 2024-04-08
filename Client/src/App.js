import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { notificationRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import CustomLayout from "./components/CustomLayout";
import ShopContextProvider from "./context/shop-context";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = route.customLayout ? CustomLayout : DefaultLayout;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            {notificationRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Page />
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </ShopContextProvider>
  );
}

export default App;
