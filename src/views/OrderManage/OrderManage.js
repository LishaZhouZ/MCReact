import React from "react";
import Pagination from "react-js-pagination";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  OverlayTrigger,
  Tooltip,

} from "react-bootstrap";

class OrderManage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      order: []
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  componentDidMount() {
    //make a call to rest api
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ order: res })
      })
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">订单搜索</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <label>订单号</label>
                        <Form.Control placeholder="000001" type="text">
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>联系人姓名</label>
                        <Form.Control placeholder="中国" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <label>联系人手机号</label>
                        <Form.Control placeholder="德国" type="text"></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button className="btn-fill pull-right" type="submit" variant="info">
                    查询
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
                <Card.Title as="h4">订单列表</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">订单号</th>
                      <th className="border-0">产品名称</th>
                      <th className="border-0">下单时间</th>
                      <th className="border-0">出行时间</th>
                      <th className="border-0">联系人</th>
                      <th className="border-0">联系人电话</th>
                      <th className="border-0">预定数</th>
                      <th className="border-0">支付方式</th>
                      <th className="border-0">订单状态</th>
                      <th className="border-0">操作选项</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.order.map(order => (
                      <tr key={order.id}>
                        <OrderList order={order} />
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={450}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>
    );
  }
}

//display order list
function OrderList(props) {
  return (
    <>
      <td>{props.order.id}</td>
      <td>{props.order.name}</td>
      <td>26.02.2006</td>
      <td>35.03.2006</td>
      <td>{props.order.username}</td>
      <td>0123456789</td>
      <td>5</td>
      <td>支付宝</td>
      <td>待审核</td>
      <td>
        <OverlayTrigger overlay={<Tooltip id="edit_tooltip">查看</Tooltip>}>
          <Button onClick={props.checkButtonClick}

            className="btn-simple btn-link p-1" type="button" variant="info">

            <i className="fas fa-edit"></i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id="remove_tooltip">删除</Tooltip>}>
          <Button className="btn-simple btn-link p-1" type="button" variant="danger">
            <i className="fas fa-times"></i>
          </Button>
        </OverlayTrigger>
      </td>
    </>
  );
}
export default OrderManage;