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


const equalTo = (value1, value2) => value1 === value2;
const minLength = (value, length) => value.length >= length;

class EditUserSupplier extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangePwd = this.handleChangePwd.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

        this.state = {
            supplierId: this.props.location.state.id,
            username: "",
            name:"",
            email:"",
            phoneNum:"",

            oldPwd:"",
            oldPwdState:true,
            newPwd: "",
            newPwdState: true,
            confirmPwd: "",
            confirmPwdState: true,
            alert: null,

            errCode: 1,
            errMsg: ""
        }
    };
    componentDidMount(){
        axios.get('https://test.mchoicetravel.com:8080/boss/supplier/'+ this.state.supplierId)
        .then((res) => {
            console.log(res)
            this.setState({
              username:res.data.data.username,
              name: res.data.data.name,
              email: res.data.data.email,
              phoneNum: res.data.data.phoneNum
            })
          })
        .catch(console.log)
    }
    hideAlert() {
        this.setState({ alert: null });
    };
    displayAlert(errCode,errMsg) {
        if (errCode == 0) {
            this.setState({
                alert:
                    <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="修改成功"
                        onConfirm={() => this.hideAlert()}
                        onCancel={() => this.hideAlert()}
                        confirmBtnBsStyle="info"
                    >
                        用户{this.state.mail}密码已成功修改!
          </SweetAlert>
            });
        }
        else {
            this.setState({
                alert:
                    <SweetAlert
                        style={{ display: "block", marginTop: "-100px" }}
                        title="修改失败"
                        onConfirm={() => this.hideAlert()}
                        onCancel={() => this.hideAlert()}
                        confirmBtnBsStyle="info"
                    >
                        {errMsg}
                    </SweetAlert>
            });
        }
    };

    handleChangePwd(e) {
        e.preventDefault();
        axios.put('https://test.mchoicetravel.com:8080/boss/supplier/'+this.state.id,
        {
            
            oldPwd: this.state.oldPwd,
            newPwd: this.state.newPwd
            
          }
        ).then((response) => {
            console.log(response)
            this.setState({
                errCode: response.data.errCode,
                errMsg: response.data.errMsg,
            })
            this.displayAlert(response.data.errCode, response.data.errMsg,this.state.email)
        })
            .catch((error)=>{
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
                            <Form onSubmit={this.handleChangePwd} action="" id="handleChangePwd" method="">
                                <Card>
                                    <Card.Header>
                                        <Card.Title as="h4">供应商信息</Card.Title>
                                    </Card.Header>
                                    
                                    <Card.Body>
                                        <Form.Group>
                                            <label>
                                                用户名
                                            </label>
                                            <Form.Control plaintext readOnly 
                                            defaultValue={this.state.email} />
                                        </Form.Group>
                                        <Form.Group>
                                            <label>
                                                供应商名称
                                            </label>
                                            <Form.Control plaintext readOnly 
                                            defaultValue={this.state.name} />
                                        </Form.Group>
                                        <Form.Group>
                                            <label>
                                                供应商邮箱
                                            </label>
                                            <Form.Control plaintext readOnly 
                                            defaultValue={this.state.email} />
                                        </Form.Group>
                                        <Form.Group>
                                            <label>
                                                供应商手机号
                                            </label>
                                            <Form.Control plaintext readOnly 
                                            defaultValue={this.state.phoneNum} />
                                        </Form.Group>
                                        <Form.Group
                                            className={
                                                "has-label " +
                                                (this.state.oldPwdState ? "has-success" : "has-error")
                                            }
                                        >
                                            <label>
                                                旧密码 <span className="star">*</span>
                                            </label>
                                            <Form.Control
                                                id="oldPwd"
                                                name="oldPwd"
                                                type="password"
                                                value={this.state.oldPwd}
                                                onChange={(e) => {
                                                    this.setState({ oldPwd: e.target.value });
                                                    if (minLength(e.target.value, 1)) {
                                                        this.setState({ oldPwdState: true });
                                                    } else {
                                                        this.setState({ oldPwdState: false });
                                                    }
                                                }}
                                            ></Form.Control>
                                            {this.state.oldPwdState ? null : (
                                                <label className="error">必填区域</label>
                                            )}
                                        </Form.Group>
                                        <Form.Group
                                            className={
                                                "has-label " +
                                                (this.state.newPwdState ? "has-success" : "has-error")
                                            }
                                        >
                                            <label>
                                                新密码 <span className="star">*</span>
                                            </label>
                                            <Form.Control
                                                id="newPwd"
                                                name="password"
                                                type="password"
                                                value={this.state.newPwd}
                                                onChange={(e) => {
                                                    this.setState({ newPwd: e.target.value });
                                                    if (minLength(e.target.value, 1)) {
                                                        this.setState({ newPwdState: true });
                                                    } else {
                                                        this.setState({ newPwdState: false });
                                                    }
                                                }}
                                            ></Form.Control>
                                            {this.state.newPwdState ? null : (
                                                <label className="error">必填区域</label>
                                            )}
                                        </Form.Group>
                                        <Form.Group
                                            className={
                                                "has-label " +
                                                (this.state.confirmPwdState
                                                    ? "has-success"
                                                    : "has-error")
                                            }
                                        >
                                            <label>
                                                确认新密码 <span className="star">*</span>
                                            </label>
                                            <Form.Control
                                                equalto="#newPwd"
                                                id="confirmPwd"
                                                name="password_confirmation"
                                                type="password"
                                                value={this.state.confirmPwd}
                                                onChange={(e) => {
                                                    this.setState({ confirmPwd: e.target.value });
                                                    if (equalTo(e.target.value, this.state.newPwd)) {
                                                        this.setState({ confirmPwdState: true });
                                                    } else {
                                                        this.setState({ confirmPwdState: false });
                                                    }
                                                }}
                                            ></Form.Control>
                                            {this.state.confirmPwdState ? null : (
                                                <label className="error">
                                                    这里需要和新密码一致
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
                                                        !this.state.oldPwdState ||
                                                        !minLength(this.state.oldPwd,1)
                                                    ) {
                                                        this.setState({ oldPwdState: false });
                                                    } else {
                                                        this.setState({ oldPwdState: true });
                                                    }
                                                    if (
                                                        !this.state.newPwdState ||
                                                        !minLength(this.state.newPwd, 1)
                                                    ) {
                                                        this.setState({newPwdState: false });
                                                    } else {
                                                        this.setState({newPwdState: true });
                                                    }
                                                    if (
                                                        !this.state.confirmPwdState ||
                                                        !minLength(this.state.confirmPwd, 1) ||
                                                        !equalTo(this.state.confirmPwd, this.state.newPwd)
                                                    ) {
                                                        this.setState({ confirmPwdState: false });
                                                    } else {
                                                        this.setState({ confirmPwdState: true });
                                                    }

                                                }
                                            }
                                        >
                                            修改密码
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

export default EditUserSupplier;
