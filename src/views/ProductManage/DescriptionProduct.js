import React from "react";
import {
    Card,
    Table,
    Container,
    Row,
    Col,
    Form,
    Button,
    Dropdown,
    OverlayTrigger,
    Tooltip,
    Tab,
    Nav,
    Tabs,
    FormGroup, 
    FormControl

} from "react-bootstrap";
const axios = require('axios').default;
import Select from "react-select";
import ReactDatetime from "react-datetime";
import SweetAlert from "react-bootstrap-sweetalert";
class DescriptionProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            errCode: 1,
            errMsg: "",
            id: props.id,


        };
    }
    render() {
        return (
            <>
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">商品描述</Card.Title>
                        <p className="card-category">商品编号：{this.state.id}</p>
                    </Card.Header>
                    <Card.Body>
                        <Container fluid>
                            <Tab.Container
                                id="plain-tabs"
                                defaultActiveKey="info-plain"
                            >
                                <Nav role="tablist" variant="tabs">
                                    <Nav.Item>
                                        <Nav.Link eventKey="info-plain">景点介绍</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="description-plain">行程详情</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="notice-plain">注意事项</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey="info-plain">
                                        <br></br>
                                        <InfoPlain id ={this.state.id}/>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="description-plain">
                                        <br></br>
                                        <DescriptionPlain />

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="notice-plain">
                                        <br></br>
                                        <NoticePlain />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </Container>
                    </Card.Body>
                </Card>
            </>);
    }
}

class InfoPlain extends React.Component {
    constructor(props) {
        super(props);
        this.submitIntroduction=this.submitIntroduction.bind(this);
        this.state = {
            viewIntroduction: "",
            alert:null,
            id: props.id
        };
    }
    submitIntroduction(e){
        e.preventDefault();
        let formData = new FormData();
        formData.set("viewIntroduction", this.state.viewIntroduction);
        let id = this.state.id;
        var url='https://test.mchoicetravel.com:8080/boss/oneday/product/'+ id +'/view-introductions';
        
        axios.post(url,formData)
        .then((response) => {
            console.log(response)
            this.setState({
                errCode: response.data.errCode,
                errMsg: response.data.errMsg,
            })
            this.displayAlert(response.data.errCode, response.data.errMsg,id)
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    hideAlert() {
        this.setState({ alert: null });
    };
    displayAlert(errCode,errMsg,id) {
        if (errCode == 0) {
            this.setState({
                alert:
                    <SweetAlert
                        success
                        style={{ display: "block", marginTop: "-100px" }}
                        title="提交成功"
                        onConfirm={() => this.hideAlert()}
                        onCancel={() => this.hideAlert()}
                        confirmBtnBsStyle="info"
                    >
                        商品{id}描述已提交成功!
          </SweetAlert>
            });
        }
        else {
            this.setState({
                alert:
                    <SweetAlert
                        style={{ display: "block", marginTop: "-100px" }}
                        title="提交失败"
                        onConfirm={() => this.hideAlert()}
                        onCancel={() => this.hideAlert()}
                        confirmBtnBsStyle="info"
                    >
                        {errMsg}
                    </SweetAlert>
            });
        }
    };

    render() {
        return (
            <>
                {this.state.alert}
                <Form onSubmit={this.submitIntroduction}>
                <FormGroup controlId="formControlsTextarea" >
                    <Form.Label>请输入景点描述</Form.Label>
                    <FormControl as="textarea" row="10" />
                </FormGroup>
                <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                    >
                        保存
                    </Button>
                    <div className="clearfix"></div>
                </Form>
            </>
        )
    }
}
//description 2nd-Tab
class DescriptionPlain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            errCode: 1,
            errMsg: "",
            id: props.id,
            journeyDetails: [{
                time: "",
                type: "0",
                summary: "",
                content: "",
                duration: ""
            }
            ]
        };
    };

    render() {
        return (
            <>
                <Form>
                    <h4>集合设置</h4>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Button
                                    className="btn-wd btn-outline mr-1"
                                    type="button"
                                    variant="info"
                                >
                                    <span className="btn-label">
                                        <i className="fas fa-exclamation"></i>
                                    </span>
                        集合点
                      </Button>
                                <Button
                                    className="btn-wd btn-outline mr-1"
                                    type="button"
                                    variant="info"
                                >
                                    <span className="btn-label">
                                        <i className="fas fa-exclamation"></i>
                                    </span>
                        上门接
                      </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Group>
                                <label>集合地点</label>
                                <Form.Control
                                    defaultValue=""
                                    placeholder="输入集合地点或上门范围,以及额外费用说明"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <h4>行程设置</h4>
                    <Row>
                        <Col md="2">
                            <Form.Group>
                                <label>集合时间/上门时间</label>
                                <ReactDatetime
                                    dateFormat={false}
                                    inputProps={{
                                        className: "form-control",
                                        placeholder: "00:00",
                                    }}
                                ></ReactDatetime>
                            </Form.Group>
                        </Col>

                        <Col md="2">

                            <Form.Group>
                                <label>前往</label>
                                <Form.Control
                                    defaultValue=""
                                    placeholder=""
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="4">
                            <Form.Group>
                                <label>景点说明</label>
                                <Form.Control
                                    defaultValue=""
                                    placeholder="输入景点相关介绍"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="2">
                            <Form.Group>
                                <label>结束时间</label>
                                <ReactDatetime
                                    dateFormat={false}
                                    inputProps={{
                                        className: "form-control",
                                        placeholder: "00:00",
                                    }}
                                ></ReactDatetime>
                            </Form.Group>
                        </Col>

                        <Col md="2">

                            <Form.Group>
                                <label>前往</label>
                                <Form.Control
                                    defaultValue=""
                                    placeholder=""
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                    >
                        保存
                    </Button>
                    <div className="clearfix"></div>
                </Form>
            </>
        );
    }
}


class NoticePlain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <>
                <Form>
                    <h4>交通</h4>

                    <Row>

                        <Col md='2'>

                            <Form.Group>
                                <label>提供</label>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        aria-expanded={false}
                                        aria-haspopup={true}
                                        data-toggle="dropdown"
                                        id="containMeals"
                                        variant="default"
                                        className="m-0"
                                    >
                                        <span className="no-icon">请选择</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                                        <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                                            去程
                  </Dropdown.Item>
                                        <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                                            回程
                  </Dropdown.Item>
                                        <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                                            全程
                  </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <label>接送服务</label>
                                <Form.Control
                                    defaultValue=""
                                    placeholder="补充说明"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md="4">
                            <Form.Group>
                                <label>景区内交通</label>
                                <Form.Control
                                    defaultValue=""
                                    placeholder="自理"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col className="px-1" md="4">
                            <Form.Group>
                                <label>其他交通费用说明</label>
                                <Form.Control
                                    defaultValue=""
                                    placeholder="不包含xxx"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="pr-1" md="6">
                            <Form.Group>
                                <label>商品名称</label>
                                <Form.Control
                                    placeholder="请输入商品名称，不超过32个字"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Form.Group>
                                <label>商品亮点</label>
                                <Row>
                                    <Col md="3">
                                        <Form.Control
                                            placeholder="请输入产品特色"
                                            type="text"
                                        ></Form.Control>
                                    </Col>
                                    <Col md="3">
                                        <Form.Control
                                            placeholder="请输入产品特色"
                                            type="text"
                                        ></Form.Control>
                                    </Col>
                                    <Col md="3">
                                        <Form.Control
                                            placeholder="请输入产品特色"
                                            type="text"
                                        ></Form.Control>
                                    </Col>
                                    <Col md="3">
                                        <Form.Control
                                            placeholder="请输入产品特色"
                                            type="text"
                                        ></Form.Control>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="pr-1" md="2">
                            <Form.Group>
                                <label>起始时间</label>
                                <Form.Control
                                    placeholder="00：00"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="px-1" md="2">
                            <Form.Group>
                                <label>结束时间</label>
                                <Form.Control
                                    placeholder="00：00"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="px-1" md="2">
                            <Form.Group>
                                <label>景点个数</label>
                                <Form.Control
                                    placeholder="景点数"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="px-1" md="2">
                            <Form.Group>
                                <label>景点用时(H)</label>
                                <Form.Control
                                    placeholder="总时长"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>

                        <Col className="px-1" md="2">
                            <Form.Group>
                                <label>集合地点</label>
                                <Form.Control
                                    placeholder="请输入"
                                    type="text"
                                ></Form.Control>
                            </Form.Group>
                        </Col>


                    </Row>
                    <Row>
                        <Col md="12">
                            <Form.Group>
                                <label>商品图片</label>
                                <Form.Control
                                    cols="80"
                                    placeholder="上传图片不超过20张"
                                    rows="4"
                                    as="textarea"
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                    >
                        保存
                    </Button>
                    <div className="clearfix"></div>
                </Form>
            </>
        );
    }
}

export default DescriptionProduct;