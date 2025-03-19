import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages

import DashboardOverview from "./dashboard/DashboardOverview";
import Notifications from "./Notifications/Notifications";
import Settings from "./Settings/Settings";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Lock from "./Auth/Lock";
import NotFoundPage from "./Auth/NotFound";
import ServerError from "./Auth/ServerError";



// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Preloader from "../components/Preloader";
import Blogs from './Blogs/Blogs';
import MyBlogs from './MyBlogs/MyBlogs';
import Friends from './Friends/Friends';
import Messages from './Messages/Messages';
import BlogsDetails from './Blogs/BlogsDetails';
import Profile from './Profile/Profile';
import CreateEditBlog from './MyBlogs/CreateEditBlog';


const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route {...rest} render={props => ( <> <Preloader show={loaded ? false : true} /> <Component {...props} /> </> ) } />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem('settingsVisible') === 'false' ? false : true
  }

  const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem('settingsVisible', !showSettings);
  }

  return (
    <Route {...rest} render={props => (
      <>
        <Preloader show={loaded ? false : true} />
        <Sidebar />

        <main className="content">
          <Navbar />
          <Component {...props} />
         
        </main>
      </>
    )}
    />
  );
};

export default () => (
  <Switch>
  
    <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
    <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />
    <RouteWithLoader exact path={Routes.ForgotPassword.path} component={ForgotPassword} />
    <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword} />
    <RouteWithLoader exact path={Routes.Lock.path} component={Lock} />
    <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage} />
    <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError} />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
    <RouteWithSidebar exact path={Routes.Notifications.path} component={Notifications} />
    <RouteWithSidebar exact path={Routes.Profile.path} component={Profile} />
    <RouteWithSidebar exact path={Routes.Settings.path} component={Settings} />
    <RouteWithSidebar exact path={Routes.CreateEditBlog.path} component={CreateEditBlog} />
    <RouteWithSidebar exact path={Routes.EditBlog.path} component={CreateEditBlog} />
    <RouteWithSidebar exact path={Routes.Blogs.path} component={Blogs} />
    <RouteWithSidebar exact path={Routes.BlogsDetails.path} component={BlogsDetails} />
    <RouteWithSidebar exact path={Routes.MyBlogs.path} component={MyBlogs} />
    <RouteWithSidebar exact path={Routes.Friends.path} component={Friends} />
    <RouteWithSidebar exact path={Routes.Messages.path} component={Messages} />







    <Redirect to={Routes.NotFound.path} />
  </Switch>
);
