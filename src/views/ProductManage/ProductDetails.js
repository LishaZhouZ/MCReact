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
  Tab,
  Nav,
  Tabs,
  Breadcrumb

} from "react-bootstrap";
import InfoBasicProduct from "./InfoBasicProduct.js"
import DescriptionProduct from "./DescriptionProduct.js"
class ProductDetails extends React.Component {

  constructor(props) {
    super(props);
    if(this.props.match.params.id){
      this.state = {
        id:this.props.match.params.id,
        submitInfo: [] };}
    else {
      this.state = {
        id:"",
        submitInfo: [] };
    }
    console.log(this.props.match.params.id);

  }

  

  componentDidMount() {
    console.log(this.props.match.params.id)
    console.log(this.state)
    //make a call to rest api
    //fetch('https://jsonplaceholder.typicode.com/users')
    //  .then(res => res.json())
    //  .then(res => {
      //   console.log(res)
      //   this.setState({ product: res })
      // })
  }
  render() {
    return (
      <>
          <Breadcrumb>
          <Breadcrumb.Item href="#pablo" onClick={(e) => e.preventDefault()}>
            商品管理
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#pablo" onClick={(e) => e.preventDefault()}>
            一日游
          </Breadcrumb.Item>
          <Breadcrumb.Item aria-current="page" active>
            商品细节
          </Breadcrumb.Item>
        </Breadcrumb>
        <Tab.Container
          id="page-subcategories-tabs"
          defaultActiveKey="Info-page-subcategories"
        >
          <div className="nav-container">
            <Nav
              role="tablist"
              variant="tabs"
              className="justify-content-center border-0 nav-icons"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="Info-page-subcategories"
                  className="border-0 bg-transparent"
                >
                  <i className="nc-icon nc-bulb-63"></i>
                  <br></br>
                商品信息
              </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="description-page-subcategories"
                  className="border-0 bg-transparent"
                >
                  <i className="nc-icon nc-align-center"></i>
                  <br></br>
                商品描述
              </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <Tab.Content>
            <Tab.Pane eventKey="Info-page-subcategories">
              <InfoBasicProduct id={this.state.id} />
            </Tab.Pane>
            <Tab.Pane eventKey="description-page-subcategories">
              <DescriptionProduct id={this.state.id} />
            </Tab.Pane>
            
          </Tab.Content>
        </Tab.Container>
      </>
    );
  }
}




export default ProductDetails;