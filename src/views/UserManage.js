import React from "react";

// react-bootstrap components
import {
  Card,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  Form,
  Dropdown,
  Tab,
  Nav,
} from "react-bootstrap";

class UserManage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      
      errCode: 1,
      errMsg:"",
      users: [] }
  }

  componentDidMount() {
    //make a call to rest api
    fetch('https://test.mchoicetravel.com:8080/boss/admins')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ 
          users: res.data,
          errCode:res.errCode,
          errMsg:res.errMsg})
      })
      .catch(console.log)
  }
  
  render() {
    return (
      <>
        <Container fluid>
          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <Card.Title as="h4">用户搜索</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group>
                          <label>用户ID</label>
                          <Form.Control
                            placeholder="000001"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>



                      <Col>
                        <Form.Group>
                          <label>用户权限</label>
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
                                管理员
                </Dropdown.Item>
                              <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
                                用户
                </Dropdown.Item>

                            </Dropdown.Menu>
                          </Dropdown>
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
              <Tab.Container
                id="plain-tabs-example"
                defaultActiveKey="info-plain"
              >
                <Nav role="tablist" variant="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="info-plain">系统管理员</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="account-plain">供应商</Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="info-plain">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">用户编号</th>
                          <th className="border-0">用户名</th>
                          <th className="border-0">创建时间</th>
                          <th className="border-0">操作选项</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map(user => (
                          <tr key={user.id}>
                            <UserList user={user}
                              checkButtonClick={() => this.handleDetailButtonClick(user.id)}
                              deleteButtonClick={() => this.handleDeleteButtonClick(user.id)} />
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="account-plain">
                  <Tab.Pane eventKey="info-plain">
                    <Table className="table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="border-0">用户编号</th>
                          <th className="border-0">用户名</th>
                          <th className="border-0">创建时间</th>
                          <th className="border-0">操作选项</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map(user => (
                          <tr key={user.id}>
                            <UserList user={user}
                              checkButtonClick={() => this.handleDetailButtonClick(user.id)}
                              deleteButtonClick={() => this.handleDeleteButtonClick(user.id)} />
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </>

    );
  }
}

function UserList(props) {
  return (
    <>
      <td>{props.user.id}</td>
      <td>{props.user.username}</td>
      <td>{props.user.createTime}</td>

      <td className="td-actions text-left">
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
    </>);
}
export default UserManage;