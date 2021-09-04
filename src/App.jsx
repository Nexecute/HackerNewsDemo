import './App.css';
import { withRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import History from './History';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/search" exact={true} component={Search} />
        <Route path="/history" exact={true} component={History} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
