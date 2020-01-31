import React from "react";
import { Route, Switch } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";

var ps;

class Admin extends React.Component {
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
      const token = sessionStorage.getItem('token')
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
      if (!body.rs) {
        return this.props.history.push('/user/login')
      }
      if (body.rs.roleid !== 1) {
        return this.props.history.push('/user/login')
      }
    } catch (error) {
      console.log('error token ', error)
    }
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
  componentWillMount() {
    let novasRotas = this.state.routes.map((rota, index) => {
      if (rota.layout === "/admin") {
        return rota
      }
      return null
    })
    console.log('novasRotas = ', novasRotas)
    this.setState({
      routesFiltered: novasRotas.filter(rt => rt)
    })
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  getRoutes = _ => {
    return this.state.routes.map((prop, key) => {
      // eslint-disable-next-line no-unused-expressions
      return <Route
        path={prop.layout + prop.path}
        component={prop.component}
        key={key}
      />
    })
  }

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
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
  render() {
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "https://www.creative-tim.com/",
              text: "MICKARTE",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <AdminNavbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />
            <Switch>{this.getRoutes(routes)}</Switch>
            {// we don't want the Footer to be rendered on map page
              this.props.location.pathname.indexOf("maps") !== -1 ? null : (
                <Footer fluid />
              )}
          </div>
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        /> */}
      </>
    );
  }
}

export default Admin;
