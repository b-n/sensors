import React from 'react';
import Home from './pages/Home'
import CastReciever from './pages/CastReciever'
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = (props) => {
  return(
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/reciever" component={CastReciever} />
      </div>
    </Router>
  )
}

export default App;
