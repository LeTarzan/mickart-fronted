/*eslint-disable*/
import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <div className="copyright">
            © 2018 made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
              DevMetal{" "}
            for a better web.
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
