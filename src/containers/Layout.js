import React from "react";
import { Layout } from "antd";
import { Link, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Navbar, NavDropdown, Button, FormControl, Form, Nav } from 'react-bootstrap'
import { Component } from "react";
import BaseRouter from "../routes";

const { Content, Footer } = Layout;

class CustomLayout extends Component {
  render() {

    return (
      <div>

        {/* {this.props.isAuthenticated ? (
          <Button key="2" onClick={this.props.logout} className="ml-2">
            Logout
          </Button>
        ) : (
            <div>
              <Link to="/login">
                <Button key="2" className="ml-2">
                  Login
                    </Button>
              </Link>
              <Link to="/signup">
                <Button key="3" className="ml-2">
                  Signup
                                 </Button>
              </Link>
            </div>

          )}
        <Link to='/'> React-Bootstrap</Link> */}
        <Layout className="layout">

          <Content >



            <Switch>
              <Navbar bg="light" expand="lg">

                <Link to='' > <Navbar.Brand >React-Bootstrap</Navbar.Brand></Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link>
                      <Link to="/create"> Home </Link>

                    </Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                      <NavDropdown.Item href="">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                  {this.props.isAuthenticated ? (
                    <Button key="2" onClick={this.props.logout} className="ml-2">
                      Logout
                    </Button>
                  ) : (
                      <div>
                        <Link to="/login">
                          <Button key="2" className="ml-2">
                            Login
                    </Button>
                        </Link>
                        <Link to="/signup">
                          <Button key="3" className="ml-2">
                            Signup
                                 </Button>
                        </Link>
                      </div>

                    )}
                </Navbar.Collapse>
              </Navbar>
            </Switch>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              {/* {this.props.children} */}
              <BaseRouter {...this.props} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            My App
        </Footer>
        </Layout>
        {/* <div>
          {this.props.children}
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
