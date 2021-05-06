import React from "react";

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

class ProductManage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {product: []};
  }
  componentDidMount(){
    //make a call to rest api
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(res => {
      //console.log(res)
      this.setState({ product: res })
    })
  }
  /** handle the detail */
  handleDetailButtonClick=(id)=>{
      this.props.history.push('/admin/productDetails/'+ id);
  }

  /** */
  handleDeleteButtonClick=(id)=>{
    //update state to delete the thing. (push request may need)
    alert('Do you want to delete this product?');
    console.log(id)
  }
  render(){
  return (
    <>
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
                <Card.Title as="h4">商品列表</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
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
                      <ProductList id={product.id} name = {product.name} 
                      checkButtonClick = {()=>this.handleDetailButtonClick(product.id)} 
                      deleteButtonClick={()=>this.handleDeleteButtonClick(product.id)}/>
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
  return (
    <>
    <td>{props.id}</td>
    <td>{props.name}</td>
    <td>上线</td>
    <td>待审核</td>

    <td className="td-actions text-left">
      <OverlayTrigger overlay={<Tooltip id="edit_tooltip">查看</Tooltip>}>
      <Button onClick = {props.checkButtonClick}

      className="btn-simple btn-link p-1" type="button" variant="info">
      
      <i className="fas fa-edit"></i>
      </Button>
      </OverlayTrigger>
                          
      <OverlayTrigger overlay={<Tooltip id="remove_tooltip">删除</Tooltip>}>
      <Button  className="btn-simple btn-link p-1"  type="button"  variant="danger">
        <i className="fas fa-times"></i>
      </Button>
      </OverlayTrigger>
      </td>
    </>);
}
export default ProductManage;