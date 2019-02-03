import React from "react";
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";

var ps;

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "primary",
      routes: routes,
      routesFiltered: [],
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  async verifyToken() {
    try {
      if (this.props.location.pathname !== '/user/esqueci-senha') {
        const token = localStorage.getItem('token')
        if (!token) {
          return this.props.history.push('/user/login')
        }
        const response = await fetch(`
      http://localhost:3000/token/verify-token
    `, {
            method: 'POST',
            body: JSON.stringify({
              token
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        const body = await response.json();
        console.log('body = ', body)
        if (!body.result) {
          return this.props.history.push('/user/login')
        }
      }
    } catch (error) {
      console.log('error token ', error)
    }

  }
  getUserNavBar() {
    if (this.props.location.pathname !== '/user/login'   && this.props.location.pathname !== '/user/esqueci-senha') {
      return <AdminNavbar
        {...this.props}
        toggleSidebar={this.toggleSidebar}
        sidebarOpened={this.state.sidebarOpened}
      />
    }
  };
  componentWillMount() {
    let novasRotas = this.state.routes.map((rota, index) => {
      if (rota.layout === "/user") {
        return rota
      }
      return null
    })
    // console.log('novasRotas = ', novasRotas)
    this.setState({
      routesFiltered: novasRotas.filter(rt => rt)
    })
  }
  componentDidMount() {
    this.verifyToken()
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  getRoutes = _ => {
    return this.state.routesFiltered.map((prop, key) => (
      <Route
        path={prop.layout + prop.path}
        component={prop.component}
        key={key}
      />
    ))
  }

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  getUserSidebar() {
    if (this.props.location.pathname !== '/user/login' && this.props.location.pathname !== '/user/esqueci-senha') {
      return <Sidebar
        {...this.props}
        routes={this.state.routesFiltered.filter(rota => {
          if ((rota.path === '/login') || (rota.path === '/user-profile') || (rota.path === '/esqueci-senha')) {
            return null
          }
          return rota
        })}
        bgColor={this.state.backgroundColor}
        logo={{
          outterLink: "https://www.creative-tim.com/",
          text: "MICKARTE",
          imgSrc: logo
        }}
        toggleSidebar={this.toggleSidebar}
      />
    }
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            {/* {console.log('roots ..', this.state.routesFiltered)} */}
            {this.getUserSidebar()}
            {this.getUserNavBar()}
            <div style={{ textAlign: 'center' }}>
              <h4>{this.getBrandText(this.props.location.pathname)}</h4>
            </div>
            <Switch>{this.getRoutes()}</Switch>
            { // we don't want the Footer to be rendered on map page
              this.props.location.pathname.indexOf("maps") !== -1 ? null : (
                <Footer fluid />
              )}
          </div>
        </div>
      </>
    );
  }
}

export default User;