import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import LandlordHome from './components/landlord/Home';
import LandlordSignin from './components/landlord/Signin';
import LandlordRegister from './components/landlord/Register';
import TenantHome from './components/tenant/Home';
import TenantSignin from './components/tenant/Signin';
import TenantRegister from './components/tenant/Register';
import NotFound from './components/NotFound';
import AuthContext from './components/utils/auth';
import PrivateRoute from './components/utils/auth/PrivateRoute';

function App() {
  const [authTokens, setAuthTokens] = useState();

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/tenant" exact component={TenantHome} />
          <PrivateRoute path="/landlord" exact component={LandlordHome} />
          <PrivateRoute path="/landlord/property/:id" exact component={LandlordHome} />
          <Route path="/login/landlord" exact component={LandlordSignin} />
          <Route path="/login/tenant" exact component={TenantSignin} />
          <Route path="/register/landlord" exact component={LandlordRegister} />
          <Route path="/register/tenant" exact component={TenantRegister} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
