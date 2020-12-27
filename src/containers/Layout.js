import React from "react";
import { Layout } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { Navbar, NavDropdown, Button, FormControl, Form, Nav } from 'react-bootstrap'

const { Content, Footer } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        {/* <Header>
                 <div className="logo" />
                 <Menu
                   theme="dark"
                   mode="horizontal"
                   defaultSelectedKeys={["2"]}
                   style={{ lineHeight: "64px" }}
                 >
                   
                 </Menu>
               </Header>*/}
        <Content >
          {/*<Breadcrumb style={{ margin: "16px 0" }}>
                      <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                      </Breadcrumb.Item>
                      {this.props.token !== null ? (
                        <Breadcrumb.Item>
                          <Link to={`/profile/${this.props.userId}`}>Profile</Link>
                        </Breadcrumb.Item>
                      ) : null}
                      {this.props.token !== null && this.props.is_teacher ? (
                        <Breadcrumb.Item>
                          <Link to="/create">Create</Link>
                        </Breadcrumb.Item>
                      ) : null}
                    </Breadcrumb>*/}



          <Navbar bg="light" expand="lg">

            <Link to='/'> <Navbar.Brand >React-Bootstrap</Navbar.Brand></Link>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
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
                  <Link to="/login">
                    <Button key="2" className="ml-2">
                      Login
                                  </Button>
                  </Link>

                )}
            </Navbar.Collapse>
          </Navbar>

          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          My App
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    is_teacher: state.auth.is_teacher
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
