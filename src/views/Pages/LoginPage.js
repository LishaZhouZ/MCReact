import React from "react";
const axios = require('axios').default;
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      cardClasses: "card-hidden",
      email: "",
      password: "",

      errCode: 1,
      errMsg: "",
      errState: true,
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ cardClasses: "" }), 100);
  }
  handleSubmit(e) {
    e.preventDefault();
    var url = 'https://test.mchoicetravel.com:8080/boss/login'
    var data = {
      username: this.state.email,
      pwd: this.state.password
    }

    axios.post(url, data)
      .then((response) => {
        console.log(response)
        if (response.data.errCode == 0) {
          localStorage.setItem('id_token',response.data.data.token)
          localStorage.setItem('role',response.data.data.role)
          localStorage.setItem('email', this.state.email)
          this.props.history.push('/admin/dashboard/');
        }
        else {
          this.setState({
            errState: false,
            errCode: response.data.errCode,
            errMsg: response.data.errMsg,
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <div
          className="full-page section-image"
          data-color="black"
          data-image={require("assets/img/full-screen-image-2.jpg").default}
        >
          <div className="content d-flex align-items-center p-0">
            <Container>
              <Col className="mx-auto" lg="4" md="8">
                <Form onSubmit={this.handleSubmit}>
                  <Card className={"card-login " + this.state.cardClasses}>
                    <Card.Header>
                      <h3 className="header text-center">M'Choice</h3>
                    </Card.Header>
                    <Card.Body>
                      <Card.Body>
                        <Form.Group>
                          <label>电子邮箱</label>
                          <Form.Control
                            placeholder="请输入邮箱/用户名"
                            type="email"
                            value={this.state.email}
                            onChange={(e) => {
                              this.setState({ email: e.target.value });
                            }}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <label>密码</label>
                          <Form.Control
                            placeholder="请输入密码"
                            type="password"
                            value={this.state.password}
                            onChange={(e) => {
                              this.setState({ password: e.target.value });
                            }}
                          ></Form.Control>

                        </Form.Group>
                        {this.state.errState ? null : (
                          <p className="text-danger">{this.state.errMsg}</p>
                        )}
                      </Card.Body>
                    </Card.Body>
                    <Card.Footer className="ml-auto mr-auto">
                      <Button className="btn-wd" type="submit" variant="warning">
                        登录
                    </Button>
                    </Card.Footer>
                  </Card>
                </Form>
              </Col>
            </Container>
          </div>
          <div
            className="full-page-background"
            style={{
              backgroundImage:
                "url(" +
                require("assets/img/full-screen-image-2.jpg").default +
                ")",
            }}
          ></div>
        </div>
      </>
    );
  }
}
export default LoginPage;
