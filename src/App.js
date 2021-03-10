import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ProductsContextProvider } from "./providers/StoreProvider";
import ShowContainer from "./containers/ShowContainer";
import InventryContainer from "./containers/InventryContainer";
import LoginPage from "./components/LoginPage";
import Checkout from "./components/Checkout";

function App() {
  return (
    <ProductsContextProvider>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={ShowContainer} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={LoginPage} />
          <Route path="/inventry" component={InventryContainer} />
        </Switch>
      </div>
    </ProductsContextProvider>
  );
}

export default App;
