import React from "react";
const axios = require('axios').default;
import SweetAlert from "react-bootstrap-sweetalert";
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

class UserManageSupplier extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleDetailButtonClick = this.handleDetailButtonClick.bind(this);
    this.displayAlert = this.displayWarningWithConfirmMessageAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.state = {

      errCode: 1,
      errMsg: "",
      users: [],
      alert: null,
    }
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
          onConfirm={() => this.handleDeleteUser(id)}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          confirmBtnText="确认删除"
          cancelBtnText="取消"
          showCancel
        >
          确认删除用户{id}?      
        </SweetAlert>
    });
  };


  componentDidMount() {
    var url='https://test.mchoicetravel.com:8080/boss/suppliers'
    //make a call to rest api
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({
          users: res.data,
          errCode: res.errCode,
          errMsg: res.errMsg
        })
      })
      .catch(console.log)
  }

  handleCreateButtonClick() {
    var path = {
      pathname:'/admin/user-manage/new-user-supplier',
    }
    this.props.history.push(path);
  }
  handleDeleteUser(id) {
    var url = 'https://test.mchoicetravel.com:8080/boss/supplier/'+id
    axios.delete(url)
      .then((res) => {
        if(res.data.errCode==0){
        this.setState({
          alert:
            <SweetAlert
              success
              style={{ display: "block", marginTop: "-100px" }}
              title="用户已被删除"
              onConfirm={() => this.hideAlert()}
              onCancel={() => this.hideAlert()}
              confirmBtnBsStyle="info"
            >
              用户{id}已被删除
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


  handleDetailButtonClick(id) {
    var data = {id:id}
    var path = {
      pathname:'/admin/user-manage/edit-user-supplier',
      state:data,
    }
    this.props.history.push(path);
  }
  render() {
    return (
      <>
        {this.state.alert}
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
                      <Col md="3">
                        <Form.Group>
                          <label>用户ID</label>
                          <Form.Control
                            placeholder="000001"
                            type="text"
                          ></Form.Control>
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
                  <Row>
                    <Col>
                      <Card.Title as="h4">用户列表</Card.Title>
                    </Col>
                    <Col className="ml-auto" md="3">
                      <Button className="btn-wd mr-1" variant="primary" onClick={this.handleCreateButtonClick}>
                        新增
                  </Button>
                    </Col>

                  </Row>

                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">供应商ID</th>
                        <th className="border-0">供应商名称</th>
                        <th className="border-0">创建时间</th>
                        <th className="border-0">操作选项</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.state.users.map(user => (
                        <tr key={user.id}>
                          <UserList user={user}
                            checkButtonClick={() => this.handleDetailButtonClick(user.id)}
                            deleteButtonClick={() => this.displayWarningWithConfirmMessageAlert(user.id)} />
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

function UserList(props) {
  return (
    <>
      <td>{props.user.id}</td>
      <td>{props.user.name}</td>
      <td>{props.user.createTime}</td>

      <td className="td-actions text-left">
        <OverlayTrigger overlay={<Tooltip id="edit_tooltip">查看</Tooltip>}>
          <Button onClick={props.checkButtonClick}

            className="btn-simple btn-link p-1" type="button" variant="info">

            <i className="fas fa-edit"></i>
          </Button>
        </OverlayTrigger>

        <OverlayTrigger overlay={<Tooltip id="remove_tooltip">删除</Tooltip>}>
          <Button className="btn-simple btn-link p-1" type="button" variant="danger" onClick={props.deleteButtonClick}>
            <i className="fas fa-times"></i>
          </Button>
        </OverlayTrigger>
      </td>
    </>);
}
export default UserManageSupplier;