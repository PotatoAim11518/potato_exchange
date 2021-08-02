import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import NavBar from './components/NavBar/NavBar';
import Homepage from './components/Homepage';
import Meetings from './components/Meetings';
import MeetingPage from './components/MeetingPage'
import HostingPage from './components/HostingPage';
import MeetingEditModal from './components/MeetingPage/ButtonArray/MeetingEditModal';
import MeetingEndModal from './components/MeetingPage/ButtonArray/MeetingEndModal';

import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      {/* <LoginSignup /> */}
      <Switch>
        <Route path='/' exact={true} >
          <Homepage />
        </Route>
        <Route path='/join' exact={true}>
          <Meetings/>
        </Route>
        <ProtectedRoute path='/host' exact={true}>
          <HostingPage />
        </ProtectedRoute>
        <ProtectedRoute path='/meetings/:id/update' exact={true}>
          <MeetingEditModal />
        </ProtectedRoute>
        <ProtectedRoute path='/meetings/:id/end' exact={true}>
          <MeetingEndModal />
        </ProtectedRoute>
        <Route path='/meetings/:id' exact={true}>
          <MeetingPage />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path=''>
          <h1>Oops! Where is this?</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
