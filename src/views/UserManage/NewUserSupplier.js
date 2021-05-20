import React from "react";
const axios = require('axios').default;
import SweetAlert from "react-bootstrap-sweetalert";

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Row,
    Col,
} from "react-bootstrap";

// validators
const emailValidation = (value) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        value
    );
const urlValidation = (value) => {
    let returnValue = true;
    try {
        new URL(value);
    } catch (e) {
        returnValue = false;
    } finally {
        return returnValue;
    }
    return false;
};


const equalTo = (value1, value2) => value1 === value2;
const minLength = (value, length) => value.length >= length;

class NewUserSupplier extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegisterNewUser = this.handleRegisterNewUser.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

        this.state = {
            registerEmail: "",
            registerEmailState: true,
            registerPassword: "",
            registerPasswordState: true,
            registerConfirmPassword: "",
            registerConfirmPasswordState: true,
            alert: null,
            name:"",
            nameState: true,
            phoneNum:"",
            phoneNumState:true,
            errCode: 1,
            errMsg: ""
        }
    };
    hideAlert() {
        this.setState({ alert: null });
    };
    displayAlert(errCode,errMsg,registerEmail) {
        if (errCode == 0) {
            this.setState({
                alert:
                    <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="创建成功"
                        onConfirm={() => this.hideAlert()}
                        onCancel={() => this.hideAlert()}
                        confirmBtnBsStyle="info"
                    >
                        用户{registerEmail}已成功被创建!
          </SweetAlert>
            });
        }
        else {
            this.setState({
                alert:
                    <SweetAlert
                        style={{ display: "block", marginTop: "-100px" }}
                        title="创建失败"
                        onConfirm={() => this.hideAlert()}
                        onCancel={() => this.hideAlert()}
                        confirmBtnBsStyle="info"
                    >
                        {errMsg}
                    </SweetAlert>
            });
        }
    };

    handleRegisterNewUser(e) {
        e.preventDefault();
        var url='https://test.mchoicetravel.com:8080/boss/supplier'
        var data = {
            username: this.state.registerEmail,
            pwd: this.state.registerPassword,
            name:this.state.name,
            email:this.state.registerEmail,
            phoneNum:this.state.phoneNum
        }
        axios.post(url,data
            
        ).then((response) => {
            console.log(response)
            this.setState({
                errCode: response.data.errCode,
                errMsg: response.data.errMsg,
            })
            this.displayAlert(response.data.errCode, response.data.errMsg,this.state.registerEmail)
        })
            .catch(function (error) {
                console.log(error);
            });
    };

    
    render() {
        return (
            <>
                {this.state.alert}
                <Container fluid>
                    <Row>
                        <Col className="mx-auto" md="6">
                            <Form onSubmit={this.handleRegisterNewUser} action="" id="RegisterValidation" method="">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h4">新供应商注册表格</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form.Group
                                            className={
                                                "has-label " +
                                                (this.state.registerEmailState ? "has-success" : "has-error")
                                            }
                                        >
                                            <label>
                                                电子邮箱 <span className="star">*</span>
                                            </label>
                                            <Form.Control
                                                name="email"
                                                type="email"
                                                value={this.state.registerEmail}
                                                onChange={(e) => {
                                                    this.setState({ registerEmail: e.target.value });
                                                    if (emailValidation(e.target.value)) {
                                                        this.setState({ registerEmailState: true });
                                                    } else {
                                                        this.setState({ registerEmailState: false });
                                                    }
                                                }}
                                            ></Form.Control>
                                            {this.state.registerEmailState ? null : (
                                                <label className="error">请输入</label>
                                            )}
                                        </Form.Group>
                                        <Form.Group
                                            className={
                                                "has-label " +
                                                (this.state.nameState ? "has-success" : "has-error")
                                            }
                                        >
                                            <label>
                                                供应商姓名 <span className="star">*</span>
                                            </label>
                                            <Form.Control
                                                name="name"
                                                type="name"
                                                value={this.state.name}
                                                onChange={(e) => {
                                                    this.setState({ name: e.target.value });
                                                }}
                                            ></Form.Control>
                                            {this.state.nameState ? null : (
                                                <label className="error">请输入</label>
                                            )}
                                        </Form.Group>
                                        <Form.Group
                                            className={
                                                "has-label " +
                                                (this.state.phoneNumState ? "has-success" : "has-error")
                                            }
                                        >
                                            <label>
                                                手机号码 <span className="star">*</span>
                                            </label>
                                            <Form.Control
                                                name="phone"
                                                type="phone"
                                                value={this.state.phoneNum}
                                                onChange={(e) => {
                                                    this.setState({ phoneNum: e.target.value });
                                                }}
                                            ></Form.Control>
                                            {this.state.phoneNumState ? null : (
                                                <label className="error">请输入</label>
                                            )}
                                        </Form.Group>
                                        <Form.Group
                                            className={
                                                "has-label " +
                                                (this.state.registerPasswordState ? "has-success" : "has-error")
                                            }
                                        >
                                            <label>
                                                密码 <span className="star">*</span>
                                            </label>
                                            <Form.Control
                                                id="registerPassword"
                                                name="password"
                                                type="password"
                                                value={this.state.registerPassword}
                                                onChange={(e) => {
                                                    this.setState({ registerPassword: e.target.value });
                                                    if (minLength(e.target.value, 1)) {
                                                        this.setState({ registerPasswordState: true });
                                                    } else {
                                                        this.setState({ registerPasswordState: false });
                                                    }
                                                }}
                                            ></Form.Control>
                                            {this.state.registerPassword ? null : (
                                                <label className="error">This field is required.</label>
                                            )}
                                        </Form.Group>
                                        <Form.Group
                                            className={
                                                "has-label " +
                                                (this.state.registerConfirmPasswordState
                                                    ? "has-success"
                                                    : "has-error")
                                            }
                                        >
                                            <label>
                                                确认密码 <span className="star">*</span>
                                            </label>
                                            <Form.Control
                                                equalto="#registerPassword"
                                                id="registerPasswordConfirmation"
                                                name="password_confirmation"
                                                type="password"
                                                value={this.state.registerConfirmPassword}
                                                onChange={(e) => {
                                                    this.setState({ registerConfirmPassword: e.target.value });
                                                    if (equalTo(e.target.value, this.state.registerPassword)) {
                                                        this.setState({ registerConfirmPasswordState: true });
                                                    } else {
                                                        this.setState({ registerConfirmPasswordState: false });
                                                    }
                                                }}
                                            ></Form.Control>
                                            {this.state.registerConfirmPassword ? null : (
                                                <label className="error">
                                                    This field is required and needs to be equal with the
                                                    one above.
                                                </label>
                                            )}
                                        </Form.Group>
                                        <div className="card-category form-category">
                                            <span className="star">*</span>
                   必填选项
                  </div>
                                    </Card.Body>
                                    <Card.Footer className="text-right">
                                        <Button
                                            className="btn-fill pull-right"
                                            variant="info"
                                            type="submit"
                                            onClick={
                                                () => {
                                                    if (
                                                        !this.state.registerEmailState ||
                                                        !emailValidation(this.state.registerEmail)
                                                    ) {
                                                        this.setState({ registerEmailState: false });
                                                    } else {
                                                        this.setState({ registerEmailState: true });
                                                    }
                                                    if (
                                                        !this.state.nameState ||
                                                        !minLength(this.state.name, 1)
                                                    ) {
                                                        this.setState({ nameState: false });
                                                    } else {
                                                        this.setState({ nameState: true });
                                                    }
                                                    if (
                                                        !this.state.phoneNumState ||
                                                        !minLength(this.state.phoneNum, 1)
                                                    ) {
                                                        this.setState({ phoneNumState: false });
                                                    } else {
                                                        this.setState({ phoneNumState: true });
                                                    }
                                                    if (
                                                        !this.state.registerPasswordState ||
                                                        !minLength(this.state.registerPassword, 1)
                                                    ) {
                                                        this.setState({ registerPasswordState: false });
                                                    } else {
                                                        this.setState({ registerPasswordState: true });
                                                    }
                                                    if (
                                                        !this.state.registerConfirmPasswordState ||
                                                        !minLength(this.state.registerConfirmPassword, 1) ||
                                                        !equalTo(this.state.registerConfirmPassword, this.state.registerPassword)
                                                    ) {
                                                        this.setState({ registerConfirmPasswordState: false });
                                                    } else {
                                                        this.setState({ registerConfirmPasswordState: true });
                                                    }

                                                }
                                            }
                                        >
                                            添加新用户
                  </Button>
                                        <div className="clearfix"></div>
                                    </Card.Footer>
                                </Card>
                            </Form>
                        </Col>

                    </Row>
                </Container>
            </>

        )
    };
}

export default NewUserSupplier;
