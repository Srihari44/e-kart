import './App.css';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { ProductsContextProvider } from "./providers/StoreProvider";
import ShowContainer from "./containers/ShowContainer";
import InventryContainer from "./containers/InventryContainer"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <ProductsContextProvider>
          <Route path="/" exact component={ShowContainer} />
          <Route path="/inventry" component={InventryContainer} />
        </ProductsContextProvider>
      </Switch>
    </div>
  );
}

export default App;
