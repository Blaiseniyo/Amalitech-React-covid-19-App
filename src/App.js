import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./routes/Routes";
import history from "./history"

function App() {
  return (
    <Router history={history}>
      <Routes/>
    </Router>
  );
}

export default App;
