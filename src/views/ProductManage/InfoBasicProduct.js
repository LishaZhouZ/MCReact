import React from "react";
// import { sha256 } from 'js-sha256';
// const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length);
// const randStr32 = generateRandomString(32);
// const timestamp = Date.now();
// const afterencry = sha256('randChar=' + randStr32 + 'timestamp=' + timestamp);

const axios = require('axios').default;
// react-bootstrap components
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

} from "react-bootstrap";
import TagsInput from "components/TagsInput/TagsInput.js";
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
class InfoBasicProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {

            errCode: 0,
            errMsg: "",
            id: props.id?props.id:-1,
            filledTags: [
                "可定明日",
                "立刻确认",
                "无购物",
                "有条件退"],
            submitInfo:{
                cityId:'text',
                departure:'text',
                type:'text',
                price:'text',
                priceType:'text',
                title:'text',
                remark:'text',
                feature1:'text',
                feature2:'text',
                feature3:'v',
                feature4:'text',
                startTime:'text',
                endTime:'text',
                places:'text',
                placesDuration:'text',
                lunch:'text',
                bookTomorrow:'text',
                collectionWay:'text',
            }
        }
    };

    handleSubmit(e){
        e.preventDefault();
        axios.post('https://test.mchoicetravel.com:8080/boss/oneday/product', 
        {
            cityId: this.state.submitInfo.cityId,
            departure: this.state.submitInfo.departure,
            type: this.state.submitInfo.type,
            price: this.state.submitInfo.price,
            priceType: this.state.submitInfo.priceType,
            title: this.state.submitInfo.title,
            remark: this.state.submitInfo.remark,
            feature1: this.state.submitInfo.feature1,
            feature2:this.state.submitInfo.feature2,
            feature3:this.state.submitInfo.feature3,
            feature4:this.state.submitInfo.feature4,
            startTime:this.state.submitInfo.startTime,
            endTime:this.state.submitInfo.endTime,
            places:this.state.submitInfo.places,
            placesDuration: this.state.submitInfo.placesDuration,
            lunch:this.state.submitInfo.lunch,
            bookTomorrow:this.state.submitInfo.bookTomorrow,
            collectionWay:this.state.submitInfo.collectionWay,
        },
        // {   
        //     headers: {
        //     randChar:randStr32,
        //     timestamp: timestamp,
        //     sign:afterencry
        //     }}
        )
          .then((response)=>{
            this.setState({
                errCode: response.errCode,
                errMsg: response.errMsg,
                id: response.data.productId
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount() {
        console.log(this.state.id);
        console.log(this.state);
    }
    render() {
        return (
            <>
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">基本信息</Card.Title>
                        <p className="card-category">商品编号：{this.state.id}</p>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit = {this.handleSubmit}>
                            <Row>
                                <Col className="pr-1" md="2">
                                    <Form.Group>
                                        <label>国家名</label>
                                        <Form.Control
                                            defaultValue="德国"
                                            placeholder="德国"
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="2">
                                    <Form.Group>
                                        <label>城市名</label>
                                        <Form.Control
                                            defaultValue="柏林"
                                            placeholder="柏林"
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="2">
                                    <Form.Group>
                                        <label>出发地</label>
                                        <Form.Control
                                            defaultValue="慕尼黑"
                                            placeholder="慕尼黑"
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="2">
                                    <Form.Group>
                                        <label>商品类型</label>
                                        <Form.Control
                                            defaultValue="包车游"
                                            placeholder="包车游"
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
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>商品特色</label>
                                        <TagsInput
                                            value={this.state.filledTags}
                                            onChange={(value) => setFilledTags(value)}
                                            tagProps={{
                                                className: "react-tagsinput-tag tag-fill tag-azure",
                                            }}
                                        />
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
                                <Col>
                                    <Form.Group>
                                        <label>是否包含午餐</label>
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
                                                    是
                  </Dropdown.Item>
                                                <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    否
                  </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row>
                                <Col md="12">
                                    <Form.Group>
                                        <label>商品图片</label>
                                        <ImagesUploader
                                            url="http://localhost:9090/multiple"
                                            optimisticPreviews
                                            onLoadEnd={(err) => {
                                                if (err) {
                                                    console.error(err);
                                                }
                                            }}
                                        />
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
                    </Card.Body>
                </Card>
            </>
        )
    }
}
export default InfoBasicProduct;