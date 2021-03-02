import './App.css';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Container from "./Container"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" component={Container} />
        <Route path="/inventry" component={Container} />
      </Switch>
    </div>
  );
}

export default App;
