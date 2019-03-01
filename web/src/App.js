import React from 'react';
import Home from './pages/Home'
import CastReciever from './pages/CastReciever'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import queryString from 'query-string'

const App = (props) => {

  return(
    <Router basename={process.env.NODE_ENV === 'development' ? '' : '/sensors'}>
      <div>
        <Route exact path="/" render={({history, location}) => {
          if (queryString.parse(location.search).reciever !== undefined) {
            history.push('/reciever');
            return null;
          } 
          return (<Home />)
        }} />
        <Route path="/reciever" component={CastReciever} />
      </div>
    </Router>
  )
}

export default App;
