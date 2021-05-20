import React from "react";
// import { sha256 } from "js-sha256";
// const generateRandomString = (length=6)=>Math.random().toString(20).substr(2, length);
// const randStr32 = generateRandomString(32);
// const timestamp = Date.now();
// const afterencry = sha256("randChar=" + randStr32 + "timestamp=" + timestamp);
const axios = require("axios").default;
import SweetAlert from "react-bootstrap-sweetalert";
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
    FormGroup,

} from "react-bootstrap";
import Select from "react-select";
import TagsInput from "components/TagsInput/TagsInput.js";
import ImagesUploader from "react-images-uploader";
import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";
import image1 from "assets/img/full-screen-image-1.jpg";
class InfoBasicProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);

        this.state = {

            errCode: 0,
            errMsg: "",
            alert:null,
            id: props.id ? props.id : -1,

            countryOptions: [],
            countrySeleted: {},

            filledTags: [
                "可定明日",
                "立刻确认",
                "无购物",
                "有条件退"],

            typeOfProduct: [
                { value: "0", label: "包车游" },
                { value: "1", label: "拼车游" }
            ],
            selectedType: {},


            priceTypeList: [
                { value: "1", label: "欧元" },
                { value: "2", label: "人民币" }
            ],
            selectedPriceType: { value: "1", label: "欧元" },

            lunchType: [
                { value: "0", label: "不包含" },
                { value: "1", label: "包含" }
            ],
            selectedLunch: {},

            bookTomorrowType: [
                { value: "0", label: "否" },
                { value: "1", label: "是" }
            ],
            selectedBookTomorrow: {},

            collectionWayType: [
                { value: "1", label: "上门接送" }
            ],
            selectedCollectionWay: {},


            cityId: "1",
            departure: "慕尼黑",
            type: "0",
            price: "0",
            priceType: "1",
            title: "商品名未输入",
            remark: "可定明日|立刻确认|无购物|有条件退",
            feature1: "亮点1",
            feature2: "亮点2",
            feature3: "亮点3",
            feature4: "亮点4",
            startTime: "00:00",
            endTime: "00:00",
            places: "3",
            placesDuration: "7",
            lunch: "0",
            bookTomorrow: "1",
            collectionWay: "1",
            //video:"",
            images: image1
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.price)
        axios.post("https://test.mchoicetravel.com:8080/boss/oneday/product",
            {
                cityId: this.state.cityId,
                departure: this.state.departure,
                type: this.state.type,
                price: this.state.price,
                priceType: this.state.priceType,
                title: this.state.title,
                remark: this.state.remark,
                feature1: this.state.feature1,
                feature2: this.state.feature2,
                feature3: this.state.feature3,
                feature4: this.state.feature4,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                places: this.state.places,
                placesDuration: this.state.placesDuration,
                lunch: this.state.lunch,
                bookTomorrow: this.state.bookTomorrow,
                collectionWay: this.state.collectionWay,
                video: this.state.video,
                images: this.state.images,
            },
            {
                headers: {
                    "token": localStorage.getItem("id_token")
                }
            }
            //{   
            //     headers: {
            //     randChar:randStr32,
            //     timestamp: timestamp,
            //     sign:afterencry
            //     }}
        )
        .then((response) => {
                console.log(response)
                this.setState({
                    errCode: response.data.errCode,
                    errMsg: response.data.errMsg,
                    id: response.data.productId
                })
                this.displayAlert(response.data.errCode, response.data.errMsg, this.state.id)
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
                        title="商品创建成功"
                        onConfirm={() => this.hideAlert()}
                        onCancel={() => this.hideAlert()}
                        confirmBtnBsStyle="info"
                    >
                        商品{id}已成功被创建!
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

    componentDidMount() {
        axios.get("https://test.mchoicetravel.com:8080/boss/cities")
            .then((res) => {
                let countryOptionsTemp = [];
                res.data.data.cities.map(
                    (prop) => {
                        console.log(prop);
                        countryOptionsTemp.push({ "value": prop.id, "label": prop.country + prop.name })
                    }
                )
                this.setState({ countryOptions: countryOptionsTemp })
            })
    }
    componentDidUpdate() {
        console.log(this.state)
    }
    render() {
        return (
            <>
                {this.state.alert}
                <Card>
                    <Card.Header>
                        <Card.Title as="h4">基本信息</Card.Title>
                        <p className="card-category">商品编号：{this.state.id}</p>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col className="pr-1" md="4">
                                    <Form.Group>
                                        <label>国家城市名</label>
                                        <Select
                                            className="react-select default"
                                            classNamePrefix="react-select"
                                            name="CountryCity"
                                            value={this.state.countrySeleted}
                                            onChange={(value) => { this.setState({ countrySeleted: value, cityId: value.value }); }}
                                            options={this.state.countryOptions}
                                            placeholder="请选择"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md="2">
                                    <Form.Group>
                                        <label>出发地</label>
                                        <Form.Control
                                            defaultValue=""
                                            placeholder="慕尼黑"
                                            onChange={(e) => this.setState({ departure: e.target.value })}
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="2">
                                    <Form.Group>
                                        <label>商品类型</label>
                                        <Select
                                            className="react-select default"
                                            classNamePrefix="react-select"
                                            name="typeOfProduct"
                                            value={this.state.selectedType}
                                            onChange={(value) => { this.setState({ selectedType: value, type: value.value }); }}
                                            options={this.state.typeOfProduct}
                                            placeholder="请选择"
                                        />
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
                                            onChange={(e) => { this.setState({ title: e.target.value }) }}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="2">
                                    <Form.Group>
                                        <label>价格</label>
                                        <Form.Control
                                            defaultValue=""
                                            placeholder="100"
                                            onChange={(e) => this.setState({ price: e.target.value })}
                                            type="text"
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="2">
                                    <Form.Group>
                                        <label>价格类型</label>
                                        <Select
                                            className="react-select default"
                                            classNamePrefix="react-select"
                                            name="typeOfProduct"
                                            value={this.state.selectedPriceType}
                                            onChange={(value) => { this.setState({ priceType: value.value, selectedPriceType: value }) }}
                                            options={this.state.priceTypeList}
                                            placeholder="请选择"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Row>
                                <Col className="pr-1" md="6">
                                    <Form.Group>
                                        <label>商品特色</label>
                                        <TagsInput
                                            value={this.state.filledTags}
                                            onChange={(value) => this.setState({ filledTags: value, remark: value.join("|") })}
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
                                                    onChange={(e) => this.setState({ feature1: e.target.value })}
                                                ></Form.Control>
                                            </Col>
                                            <Col md="3">
                                                <Form.Control
                                                    placeholder="请输入产品特色"
                                                    type="text"
                                                    onChange={(e) => this.setState({ feature2: e.target.value })}
                                                ></Form.Control>
                                            </Col>
                                            <Col md="3">
                                                <Form.Control
                                                    placeholder="请输入产品特色"
                                                    onChange={(e) => this.setState({ feature3: e.target.value })}
                                                    type="text"
                                                ></Form.Control>
                                            </Col>
                                            <Col md="3">
                                                <Form.Control
                                                    placeholder="请输入产品特色"
                                                    type="text"
                                                    onChange={(e) => this.setState({ feature4: e.target.value })}
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
                                            placeholder="00:00"
                                            type="text"
                                            onChange={(e) => this.setState({ startTime: e.target.value })}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="2">
                                    <Form.Group>
                                        <label>结束时间</label>
                                        <Form.Control
                                            placeholder="00:00"
                                            type="text"
                                            onChange={(e) => this.setState({ endTime: e.target.value })}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="2">
                                    <Form.Group>
                                        <label>景点个数</label>
                                        <Form.Control
                                            placeholder="如:3"
                                            type="text"
                                            onChange={(e) => this.setState({ places: e.target.value })}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-1" md="2">
                                    <Form.Group>
                                        <label>景点用时(H)</label>
                                        <Form.Control
                                            placeholder="如:7"
                                            type="text"
                                            onChange={(e) => this.setState({ placesDuration: e.target.value })}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="2">
                                    <Form.Group>
                                        <label>是否包含午餐</label>
                                        <Select
                                            className="react-select default"
                                            classNamePrefix="react-select"
                                            name="typeOfLunch"
                                            value={this.state.selectedLunch}
                                            onChange={(value) => { this.setState({ lunch: value.value, selectedLunch: value }) }}
                                            options={this.state.lunchType}
                                            placeholder="请选择"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="2">
                                    <Form.Group>
                                        <label>是否可定明天</label>
                                        <Select
                                            className="react-select default"
                                            classNamePrefix="react-select"
                                            name="typeOfBookTomorrow"
                                            value={this.state.selectedBookTomorrow}
                                            onChange={(value) => { this.setState({ bookTomorrow: value.value, selectedBookTomorrow: value }) }}
                                            options={this.state.bookTomorrowType}
                                            placeholder="请选择"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="2">
                                    <Form.Group>
                                        <label>集合方式</label>
                                        <Select
                                            className="react-select default"
                                            classNamePrefix="react-select"
                                            name="typeOfCollection"
                                            value={this.state.selectedCollectionWay}
                                            onChange={(value) => { this.setState({ collectionWay: value.value, selectedCollectionWay: value }) }}
                                            options={this.state.collectionWayType}
                                            placeholder="请选择"
                                        />
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