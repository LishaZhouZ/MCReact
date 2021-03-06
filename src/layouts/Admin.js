import React from "react";
import { Switch, Route} from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";

// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

// dinamically create dashboard routes
import routes from "routes.js";

import image1 from "assets/img/full-screen-image-1.jpg";
import image2 from "assets/img/full-screen-image-2.jpg";
import image3 from "assets/img/full-screen-image-3.jpg";
import image4 from "assets/img/full-screen-image-4.jpg";
import { extend } from "chartist";


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
      sidebarImage: image3,
      sidebarBackground: "black",
    }
  }

  getRoutes(routes){
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path + prop.params}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            routes={routes}
            image={this.state.sidebarImage}
            background={this.state.sidebarBackground}
            location = {this.state.location}
          />
          <div className="main-panel">
            <AdminNavbar />
            <div className="content">
              <Switch>{this.getRoutes(routes)}</Switch>
            </div>
            <AdminFooter />
            <div
              className="close-layer"
              onClick={() =>
                document.documentElement.classList.toggle("nav-open")
              }
            />
          </div>
        </div>
        <FixedPlugin
          setSidebarImageParent={(value) => this.setState({ sidebarImage: value })}
          sidebarDefaultImage={this.state.sidebarImage}
          sidebarImages={[image1, image2, image3, image4]}
          backgroundColors={[
            "black",
            "azure",
            "green",
            "orange",
            "red",
            "purple",
          ]}
          backgroundColor={this.state.sidebarBackground}
          setSidebarBackgroundParent={(value) => setState({ sidebarBackground: value })}
        />
      </>
    );
  };
}

export default Admin;
