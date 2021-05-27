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
    FormControl,
    ButtonGroup,
    ToggleButton,
    InputGroup

} from "react-bootstrap";
const axios = require('axios').default;
import Select from "react-select";
import ReactDatetime from "react-datetime";
import SweetAlert from "react-bootstrap-sweetalert";
class DescriptionProduct extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.id < 0) {
            //alert and back to first
        }
        this.state = {
            alert: null,

            errCode: 1,
            errMsg: "",
            id: props.id,

        };

    }


    render() {
        return (
            <>
                {this.state.alert}
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
                                        <InfoPlain id={this.state.id} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="description-plain">
                                        <br></br>
                                        <DescriptionPlain id={this.state.id} />

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="notice-plain">
                                        <br></br>
                                        <NoticePlain id={this.state.id} />
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
        this.submitIntroduction = this.submitIntroduction.bind(this);
        this.state = {
            viewIntroduction: "",
            alert: null,
            id: props.id
        };
    }
    submitIntroduction(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.set("viewIntroduction", this.state.viewIntroduction);
        let id = this.state.id;
        var url = 'https://test.mchoicetravel.com:8080/boss/oneday/product/' + id + '/view-introductions';

        axios.post(url, formData)
            .then((response) => {
                console.log(response)
                this.setState({
                    errCode: response.data.errCode,
                    errMsg: response.data.errMsg,
                    viewIntroduction: ""
                })
                this.displayAlert(response.data.errCode, response.data.errMsg, id)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    hideAlert() {
        this.setState({ alert: null });
    };
    displayAlert(errCode, errMsg, id) {
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
                        <FormControl as="textarea" rows={10} value={this.state.viewIntroduction} onChange={(e) => this.setState({ viewIntroduction: e.target.value })} />

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
        this.submitOneJourneyDetail = this.submitOneJourneyDetail.bind(this);
        this.uploadJourneyDetail = this.uploadJourneyDetail.bind(this);
        this.deleteJourneyByIndex = this.deleteJourneyByIndex.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
        this.state = {
            alert: null,
            errCode: 1,
            errMsg: "",
            id: props.id,
            radioValue: "",

            radios: [
                { name: '上门接', value: '1' },
                { name: '交通', value: '2' }
            ],

            tempTime: "",
            tempType: "",
            tempSummary: "",
            tempContent: "",
            tempDuration: "",



            journeyDetails: [{
                time: "08:30",
                type: "上门接",
                summary: "新加坡虽然地盘小，但各处都分布着各种寺庙、岛屿、博物馆和特色街区等等旅游热点",
                content: "新加坡虽然地盘小，但各处都分布着各种寺庙、岛屿、博物馆和特色街区等等旅游热点，如果只能在新加坡待上几天，你肯定会觉得时间仓促， 因为这里实在有着太多不容错过的景点与活动。艺术爱好者可以徜徉于博物馆和画廊，享受慵懒的下午； 历史迷可以造访历史博物馆和文化遗产中心；狂欢派可以在陶醉在环球影城刺激的活动中；大自然爱好者可以沉浸在热带雨林和花园；全家人还可以在圣淘沙环岛畅游。还不心动么",
                duration: "30分钟"
            }
            ]
        };
    }
    hideAlert() {
        this.setState({ alert: null });
    };
    displayAlert(errCode, errMsg, id) {
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
                        商品{id}行程已提交成功!
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
    submitOneJourneyDetail(e) {
        e.preventDefault();
        this.state.journeyDetails.push({
            time: this.state.tempTime,
            type: this.state.tempType,
            summary: this.state.tempSummary,
            content: this.state.tempContent,
            duration: this.state.tempDuration
        });
        this.setState({
            tempTime: "",
            tempType: "",
            tempSummary: "",
            tempContent: "",
            tempDuration: "",
            radioValue: ""
        })
        console.log(this.state.journeyDetails)
    };

    uploadJourneyDetail(e) {
        e.preventDefault();
        let id = this.state.id;
        var url = 'https://test.mchoicetravel.com:8080/boss/oneday/product/' + this.state.id + '/journey-details';
        let data = { journeyDetails: this.state.journeyDetails }
        console.log(this.state.id)
        axios.post(url, data)
            .then((response) => {
                console.log(response)
                this.setState({
                    errCode: response.data.errCode,
                    errMsg: response.data.errMsg,
                })
                this.displayAlert(response.data.errCode, response.data.errMsg, id)
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    deleteJourneyByIndex(e, id) {
        e.preventDefault();
        let temp = this.state.journeyDetails;
        temp.splice(id, 1)
        this.setState({ journeyDetails: temp });

    }
    render() {
        return (
            <>
                {this.state.alert}
                <Col>
                    <Table className="table-bigboy">
                        <thead>
                            <tr>

                                <th>时间</th>
                                <th className="text-right">交通类型</th>
                                <th className="text-right">时长</th>
                                <th className="th-description">概要信息</th>
                                <th className="th-description">具体描述</th>


                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.journeyDetails.map((prop, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{prop.time}</td>
                                        <td className="td-number">{prop.type}</td>
                                        <td className="td-number">{prop.duration}</td>
                                        <td>{prop.summary}</td>
                                        <td>{prop.content}</td>
                                        <td className="td-actions">
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip id="tooltip-408856985">删除</Tooltip>
                                                }
                                                placement="left"
                                            >
                                                <Button
                                                    className="btn-link btn-icon"
                                                    type="button"
                                                    variant="danger"
                                                    onClick={(e) => this.deleteJourneyByIndex(e, key)}

                                                >
                                                    <i className="fas fa-times"></i>
                                                </Button>
                                            </OverlayTrigger>
                                        </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </Table>

                </Col>
                <Col>
                    <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="primary"
                        onClick={this.uploadJourneyDetail}
                    >
                        保存行程
                    </Button>
                </Col>
                <br></br>
                <br></br>
                <h4>添加新行程</h4>
                <Col>
                    <Form onSubmit={this.submitOneJourneyDetail}>
                        <Row>
                            <Col md="2">
                                <Form.Group>
                                    <label>时间</label>
                                    <Form.Control
                                        value={this.state.tempTime}
                                        placeholder="08:00"
                                        type="text"
                                        onChange={(e) => this.setState({ tempTime: e.target.value })}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col md='3'>
                                <ButtonGroup toggle>
                                    {this.state.radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            className="btn-outline"
                                            variant="default"
                                            name="radio"
                                            value={radio.value}
                                            checked={this.state.radioValue === radio.value}
                                            onChange={(e) => this.setState({
                                                radioValue: e.currentTarget.value,
                                                tempType: e.currentTarget.name
                                            })
                                            }  >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col >
                                <Form.Group>
                                    <label>概要信息</label>
                                    <Form.Control
                                        value={this.state.tempSummary}
                                        placeholder="输入集合地点或上门范围,以及额外费用说明"
                                        type="text"
                                        onChange={(e) => this.setState({ tempSummary: e.target.value })}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup controlId="formControlsTextareaInfo" >
                                    <Form.Label>具体描述</Form.Label>
                                    <FormControl as="textarea" row="10" placeholder="输入景点相关介绍"
                                        value={this.state.tempContent}
                                        onChange={(e) => this.setState({ tempContent: e.target.value })} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="2">
                                <Form.Group>
                                    <label>时长</label>
                                    <Form.Control
                                        value={this.state.tempDuration}
                                        placeholder="30分钟"
                                        type="text"
                                        onChange={(e) => this.setState({ tempDuration: e.target.value })}
                                    ></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="info"
                        >
                            添加行程(仅添加到列表)
                    </Button>
                        <div className="clearfix"></div>
                    </Form>

                </Col>
            </>
        );
    }
}

// third plain Notice-plain
class NoticePlain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            includeCost: [],
            excludeCost: [],
            trafficInclude: "",
            foodInclude: "",
            ticketInclude: "",
            guideInclude: "",
            otherInclude: "",

        };
    }
    render() {
        return (
            <>

                <Row>
                    <Col md="6">
                        <Card className="card-tasks">
                            <Card.Header>
                                <Card.Title as="h4">费用包含</Card.Title>
                                <p className="card-category">商品费用包含说明</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-full-width">

                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    交通
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>提供接送服务</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="请输入 去程/回程/全程 以及 旅游巴士/舒适商务车 以及 中文/英文/当地语言" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>景区内交通</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>

                                                    <FormControl id="inlineFormInputGroup" placeholder="其他交通费用说明" />

                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    餐饮
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>行程内包含餐饮说明</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="例如：包含午餐" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    门票
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>行程中所列景点的大门门票</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="补充说明" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>行程中所列景点的所有门票</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="补充说明" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <FormControl id="inlineFormInputGroup" placeholder="其他门票费用说明" />

                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    司导
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>包含</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="司机/导游/司机兼导游 服务费 讲解器费用" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>

                                                    <FormControl id="inlineFormInputGroup" placeholder="其他关于司导/讲解器的费用说明" />

                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>


                                            <tr>
                                                <td>
                                                    其他
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>

                                                    <FormControl id="inlineFormInputGroup" placeholder="自定义, 如针对特殊人群的费用包含说明" />

                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <Button
                                    className="btn-fill pull-right"
                                    type="submit"
                                    variant="info"
                                >
                                    保存
                    </Button>
                                <div className="clearfix"></div>


                            </Card.Body>

                        </Card>
                    </Col>
                    <Col md="6">
                        <Card className="card-tasks">
                            <Card.Header>
                                <Card.Title as="h4">费用不含</Card.Title>
                                <p className="card-category">商品费用不包含说明</p>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-full-width">

                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    交通
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>超出指定接送区域，需额外支付一定费用</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="费用规则" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>景区内交通</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="如xxx景区内公交费用5欧" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>

                                                    <FormControl id="inlineFormInputGroup" placeholder="其他交通费用说明" />

                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    餐饮
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>行程内不含餐饮说明</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder=" " />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    门票
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>具体门票价格以实际价格为准</InputGroup.Text>

                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>

                                                    <FormControl id="inlineFormInputGroup" placeholder="其他门票费用说明" />

                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    司导
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>不含</InputGroup.Text>
                                                        <FormControl id="inlineFormInputGroup" placeholder="司机/导游/司机兼导游服务费, 需支付约xx欧" />
                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>
                                                    <InputGroup>
                                                        <InputGroup.Text>此商品未包含小费费用,如果您对我们的服务感到满意,可酌情给予小费</InputGroup.Text>

                                                    </InputGroup>
                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>

                                                    <FormControl id="inlineFormInputGroup" placeholder="其他关于司导/讲解器的不包含费用说明" />

                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    其他
                                                </td>
                                                <td></td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Form.Check className="mb-1 pl-0">
                                                        <Form.Check.Label>
                                                            <Form.Check.Input
                                                                defaultValue=""
                                                                type="checkbox"
                                                            ></Form.Check.Input>
                                                            <span className="form-check-sign"></span>
                                                        </Form.Check.Label>
                                                    </Form.Check>
                                                </td>
                                                <td>

                                                    <FormControl id="inlineFormInputGroup" placeholder="自定义,如针对特殊人群的费用不包含说明" />

                                                </td>
                                                <td className="td-actions text-right"></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <Button
                                    className="btn-fill pull-right"
                                    type="submit"
                                    variant="info"
                                >
                                    保存
                    </Button>
                                <div className="clearfix"></div>

                            </Card.Body>

                        </Card>
                    </Col>
                </Row>

            </>
        );
    }
}

export default DescriptionProduct;