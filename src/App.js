import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "@material-tailwind/react/tailwind.css";

import "react-toastify/dist/ReactToastify.css";

import GuestRoute from "components/Routes/GuestRoute";
import MemberRoute from "components/Routes/MemberRoute";
import AdminRoute from "components/Routes/AdminRoute";

import Login from "pages/Login";
import PrivacyPolice from "pages/PrivacyPolice";
import TermAndConditions from "pages/TermAndConditions";
import NotFound from "pages/404";
import Unauthenticated from "pages/401";

import Dashboard from "pages/admin/Dashboard";
import SourceCode from "pages/admin/SourceCode";
import DetailsSourceCode from "pages/admin/SourceCode/Details";
import AddVideoSourceCode from "pages/admin/SourceCode/AddVideo";
import EditVideoSourceCode from "pages/admin/SourceCode/EditVideo";
import AddDocumentSourceCode from "pages/admin/SourceCode/AddDocument";
import EditDocumentSourceCode from "pages/admin/SourceCode/EditDocument";
import EditSourceCode from "pages/admin/SourceCode/EditSourceCode";
import AddSourceCode from "pages/admin/SourceCode/AddSourceCode";
import AddCategory from "pages/admin/SourceCode/AddCategory";

import UserManagement from "pages/admin/UserManagement";
import AddUserManagement from "pages/admin/UserManagement/AddUser";
import EditUserManagement from "pages/admin/UserManagement/EditUser";
import SettingAccount from "pages/admin/SettingAccount";
import LandingPage from "pages/LandingPage";
import DetailApp from "pages/DetailApp";
import VideoTutorial from "pages/VideoTutorial";
import VideoTutorialWatch from "pages/VideoTutorialWatch";
import Profile from "pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <GuestRoute path="/login" component={Login}></GuestRoute>
          <GuestRoute
            path="/term-and-conditions"
            component={TermAndConditions}
          ></GuestRoute>
          <GuestRoute
            path="/privacy-police"
            component={PrivacyPolice}
          ></GuestRoute>
          <GuestRoute path="/private" component={Unauthenticated}></GuestRoute>

          {/* Member Route */}
          <MemberRoute exact path="/" component={LandingPage}></MemberRoute>
          <MemberRoute
            exact
            path="/applications/:id"
            component={DetailApp}
          ></MemberRoute>
          <MemberRoute
            exact
            path="/applications/:id/video-tutorials"
            component={VideoTutorial}
          ></MemberRoute>

          <MemberRoute
            exact
            path="/applications/:id/:uid"
            component={VideoTutorialWatch}
          ></MemberRoute>

          <MemberRoute exact path="/profile" component={Profile}></MemberRoute>

          {/* Admin Dashboard Route  */}
          <AdminRoute
            exact
            path="/dashboard"
            component={Dashboard}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code"
            component={SourceCode}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code/add-data"
            component={AddSourceCode}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code/add-category"
            component={AddCategory}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code/:id"
            component={DetailsSourceCode}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code/:id/add-video"
            component={AddVideoSourceCode}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code/:id/Edit-video/:id"
            component={EditVideoSourceCode}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code/:id/add-document"
            component={AddDocumentSourceCode}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code/:id/Edit-document/:id"
            component={EditDocumentSourceCode}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/source-code/edit-data/:id"
            component={EditSourceCode}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/user-management"
            component={UserManagement}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/user-management/add-data"
            component={AddUserManagement}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/user-management/edit-data/:id"
            component={EditUserManagement}
          ></AdminRoute>
          <AdminRoute
            exact
            path="/setting-account"
            component={SettingAccount}
          ></AdminRoute>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
