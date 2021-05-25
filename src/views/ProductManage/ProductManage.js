import React from "react";
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
} from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
class ProductManage extends React.Component{

  constructor(props) {
    super(props);
    this.hideAlert=this.hideAlert.bind(this);
    this.displayWarningWithConfirmMessageAlert=this.displayWarningWithConfirmMessageAlert.bind(this);
    this.state = {
      alert: null,
      errCode:0,
      errMsg:"",
      product: []};
  }
  componentDidMount(){
    //make a call to rest api
    //make a call to rest api
    axios.get('https://test.mchoicetravel.com:8080/boss/oneday/products/0?')
    .then((res) => {
      console.log(res)
      this.setState({ 
        errCode: res.data.errCode,
        errMsg: res.data.errMsg,
        product: res.data.data })
    })
    .catch(console.log)
  }
  /** handle the detail */
  handleDetailButtonClick=(id)=>{
      this.props.history.push('/admin/productDetails/'+ id);
  }
  handleCreateButtonClick=()=>{
    this.props.history.push('/admin/productDetails/');
}
  /** */
  handleDeleteButtonClick=(id)=>{
    var url = 'https://test.mchoicetravel.com:8080/boss/oneday/product/' + id
    axios.delete(url)
    .then((res) => {
      if(res.data.errCode==0){
      this.setState({
        alert:
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="商品已被删除"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnBsStyle="info"
          >
            商品{id}已被删除
      </SweetAlert>
      });
    }
    else{
      this.setState({
        alert:
          <SweetAlert
            danger
            style={{ display: "block", marginTop: "-100px" }}
            title="发生错误"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnBsStyle="info"
          >
            发生错误"{res.data.errMsg}"
      </SweetAlert>
      });
    }
    })
    .catch((e) => {
      console.log(e)
    })
  }



  hideAlert() {
    this.setState({ alert: null });
  };


  displayWarningWithConfirmMessageAlert(id) {
    this.setState({
      alert:
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="确认删除？"
          onConfirm={() => this.handleDeleteButtonClick(id)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          confirmBtnText="确认删除"
          cancelBtnText="取消"
          showCancel
        >
          确认删除商品{id}?      
        </SweetAlert>
    });
  };
  render(){
  return (
    <>
    {this.state.alert}
    <Container fluid>
    <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">商品搜索</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>商品ID</label>
                        <Form.Control
                          placeholder="000001"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>出发地</label>
                        <Form.Control placeholder="中国" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>目的地</label>
                        <Form.Control placeholder="德国" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>售卖状态</label>
                        <Form.Check className="mb-1 pl-2">
                          <Form.Check.Label>
                            <Form.Check.Input
                              defaultChecked = "1"
                              type="checkbox"
                            ></Form.Check.Input>
                            <span className="form-check-sign"></span>
                          </Form.Check.Label>
                        </Form.Check>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>商品类别</label>
                    <Dropdown>
                    <Dropdown.Toggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        data-toggle="dropdown"
                        id="productSearchDropdownMenuLink"
                        variant="default"
                        className="m-0"
                    >
                <span className="no-icon">请选择</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                  包车游
                </Dropdown.Item>
                <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                  拼车游
                </Dropdown.Item>
                
              </Dropdown.Menu>
            </Dropdown>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>审核状态</label>
                        <Dropdown>
                    <Dropdown.Toggle
                        aria-expanded={false}
                        aria-haspopup={true}
                        data-toggle="dropdown"
                        id="productSearchDropdownMenuLink"
                        variant="default"
                        className="m-0"
                    >
                <span className="no-icon">请选择</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                  待审核
                </Dropdown.Item>
                <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                  已审核
                </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button className="btn-fill pull-right" type="submit" variant="info">
                    筛选
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Row>
                <Col>
                <Card.Title as="h4">商品列表</Card.Title>
                </Col>
                <Col className="ml-auto" md="3">
                  <Button className="btn-wd mr-1" variant="primary" onClick={this.handleCreateButtonClick}>
                  添加商品
                  </Button>
                </Col>
                
                </Row>
                
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">商品ID</th>
                      <th className="border-0">商品名称</th>
                      <th className="border-0">商品状态</th>
                      <th className="border-0">审核情况</th>
                      <th className="border-0">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                  {this.state.product.map(product =>(
                    <tr key={product.id}>
                      <ProductList product={product} 
                      checkButtonClick = {()=>this.handleDetailButtonClick(product.id)} 
                      deleteButtonClick={()=>this.displayWarningWithConfirmMessageAlert(product.id)}/>
                    </tr>
                  ))}
                  
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
}

function ProductList (props){
  const statusStr=["未审核","审核通过","审核未通过"];
  const validStr = ["上线","下线"]
  return (
    <>
    <td>{props.product.id}</td>
    <td>{props.product.title}</td>
    <td>{statusStr[props.product.status]}</td>
    <td>{validStr[props.product.valid]}</td>

    <td className="td-actions text-left">
      <OverlayTrigger overlay={<Tooltip id="edit_tooltip">查看</Tooltip>}>
      <Button onClick = {props.checkButtonClick}

      className="btn-simple btn-link p-1" type="button" variant="info">
      
      <i className="fas fa-edit"></i>
      </Button>
      </OverlayTrigger>
                          
      <OverlayTrigger overlay={<Tooltip id="remove_tooltip">删除</Tooltip>}>
      <Button  onClick ={props.deleteButtonClick}
      className="btn-simple btn-link p-1"  type="button"  variant="danger">
      <i className="fas fa-times"></i>
      </Button>
      </OverlayTrigger>
      </td>
    </>);
}
export default ProductManage;