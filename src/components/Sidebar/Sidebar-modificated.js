import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.getCollapseStates = this.getCollapseStates.bind(this);
    this.getCollapseInitialState = this.getCollapseInitialState.bind(this);
    this.createLinks = this.createLinks.bind(this);
    this.activeRoute = this.activeRoute.bind(this);

    this.state = {
      routes: this.props.routes,
      image: this.props.image,
      background: this.props.background,
      pathname: window.location.pathname,
      userCollapseState: false,
      state: {},
      routeName: "",
    };
    
  }



  getCollapseStates(routes) {
    
  }

  //return true if
  //1.all and their sub is close
  //2.current is exactlly on the one
  getCollapseInitialState(routes) {

    if (routes.collapse && this.getCollapseInitialState(routes.views)) {
      return true;
    } else if (this.state.pathname === routes.layout + routes.path) {
      return true;
    }
    return false;
  }
  activeRoute(routeName) {
    return this.state.pathname === routeName ? "active" : "";
  };

  createLinks(routes) {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      //if set to be invisible
      if (prop.invisible) {
        return null;
      }
      //if item is closed
      //but if the sub item is open, still active
      if (prop.collapse) {
        return (
          <Nav.Item
            className={this.getCollapseInitialState(prop.views) ? "active" : ""}
            as="li"
            key={key}
          >
            <Nav.Link
              className={this.state.state[prop.state] ? "collapsed" : ""}
              data-toggle="collapse"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ state: { ...this.state.state, ...st } });
              }}
              aria-expanded={this.state.state[prop.state]}
            >
              <i className={prop.icon}></i>
              <p>
                {prop.name} <b className="caret"></b>
              </p>
            </Nav.Link>
            <Collapse in={this.state.state[prop.state]}>
              <div>
                <Nav as="ul">{this.createSubLinks(prop.views)}</Nav>
              </div>
            </Collapse>
          </Nav.Item>
        );
      }
      //if item is open

    }
    )
  };

  createSubLinks(routes) {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      //if set to be invisible
      if (prop.invisible) {
        return null;
      }
      //if is current page, return active
      return (
        <Nav.Item
          className={this.activeRoute(prop.layout + prop.path)}
          key={key}
          as="li"
        >
          <Nav.Link to={prop.layout + prop.path} as={Link}>
            {prop.icon ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </Nav.Link>
        </Nav.Item>
      )
    })

  }


  componentDidMount() {
    this.getCollapseStates(this.state.routes);

  }

  componentDidUpdate() {
    console.log(window.location)
  }

  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms

  // this function creates the links and collapses that appear in the sidebar (left menu)


  // verifies if routeName is the one active (in browser input)


  render() {
    return (
      <>
        <div className="sidebar" data-color={this.state.background} data-image={this.state.image}>
          <div className="sidebar-wrapper">
            <div className="logo">
              <a
                className="simple-text logo-mini"
                href="http://www.creative-tim.com"
              >
                <div className="logo-img">
                  <img
                    src={require("assets/img/logo.svg").default}
                    alt="react-logo"
                  />
                </div>
              </a>
              <a
                className="simple-text logo-normal"
                href="https://en.food-mchoice.com/"
              >
                M'Choice
            </a>
            </div>
            <div className="user">
              <div className="photo">
                <img
                  alt="..."
                  src={require("assets/img/default-avatar.png").default}
                ></img>
              </div>
              <div className="info">
                <a
                  className={this.state.userCollapseState ? "collapsed" : ""}
                  data-toggle="collapse"
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ userCollapseState: !this.state.userCollapseState });
                  }}
                  aria-expanded={this.state.userCollapseState}
                >
                  <span>
                    M'choice Dev<b className="caret"></b>
                  </span>
                </a>
                <Collapse id="collapseExample" in={this.state.userCollapseState}>
                  <div>
                    <Nav as="ul">
                      <li>
                        <a
                          className="profile-dropdown"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="sidebar-mini">Info</span>
                          <span className="sidebar-normal">个人信息</span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="profile-dropdown"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="sidebar-mini">Edit</span>
                          <span className="sidebar-normal">修改信息</span>
                        </a>
                      </li>
                      <li>
                        <a
                          className="profile-dropdown"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="sidebar-mini">Set</span>
                          <span className="sidebar-normal">设置</span>
                        </a>
                      </li>
                    </Nav>
                  </div>
                </Collapse>
              </div>
            </div>
            <Nav as="ul">{this.createLinks(this.state.routes)}</Nav>
          </div>
          <div
            className="sidebar-background"
            style={{
              backgroundImage: "url('" + this.state.image + "')",
            }}
          ></div>
        </div>
      </>
    );
  }
}

let linkPropTypes = {
  path: PropTypes.string,
  layout: PropTypes.string,
  name: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

Sidebar.defaultProps = {
  image: "",
  background: "black",
  routes: [],
};

Sidebar.propTypes = {
  image: PropTypes.string,
  background: PropTypes.oneOf([
    "black",
    "azure",
    "green",
    "orange",
    "red",
    "purple",
  ]),
  routes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        ...linkPropTypes,
        icon: PropTypes.string,
      }),
      PropTypes.shape({
        collapse: true,
        path: PropTypes.string,
        name: PropTypes.string,
        state: PropTypes.string,
        icon: PropTypes.string,
        views: PropTypes.shape({
          ...linkPropTypes,
          mini: PropTypes.string,
        }),
      }),
    ])
  ),
};


export default Sidebar-dadfa;
