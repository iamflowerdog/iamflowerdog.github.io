
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon, Breadcrumb, Row, Col, Statistic, Button, Input, Form } from 'antd';
// import '../../common/common';
import './index.less';
import * as axios from '../../lib/axios';

const { Header, Sider, Content } = Layout;
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: '登陆',
      collapsed: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleClick() {
    console.log(this);
    window.location.href = '/home.html';
  }
  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  componentDidMount() {
    axios.get('/console/room/statistics?id=89').then(res => {

    })
  }
  render() {
    return (
      <div className="home" >
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>nav 1</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className="bread">
                <Breadcrumb>
                  <Breadcrumb.Item href="">
                    <Icon type="home" />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href="">
                    <Icon type="user" />
                    <span>空间管理</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>房源管理</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                minHeight: 750,
              }}
            >
              <Row style={{
                padding: 24,
                marginBottom: 24,
                background: '#fff',
              }}>
                <Col span={6}>
                  <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                  <Button style={{ marginTop: 16 }} type="primary">
                    Recharge
                  </Button>
                </Col>
                <Col span={6}>
                  <Statistic title="Feedback" value={1128} prefix={<Icon type="like" />} />
                </Col>
                <Col span={6}>
                  <Statistic title="Unmerged" value={93} suffix="/ 100" />
                </Col>
                <Col span={6}>
                  <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
                </Col>
              </Row>
              <WrappedSearchForm/>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

// 表单组件
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      let options = {
        'discount': '',
        'floorId': 0,
        'name': '',
        'page': 1,
        'rows': 30,
      }
      axios.post('/console/room/price', options).then(res => {

      })

    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row style={{
          padding: 24,
          background: '#fff',
        }}>
          <Col span={8}>
            <Form.Item label="房间编号">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: false,
                    message: 'Input something!',
                  },
                ]
              })(<Input placeholder="请输入房间编号" autoComplete="off"/>)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedSearchForm = Form.create({ name: 'advanced_search' })(SearchForm);

ReactDOM.render(
  <Home />,
  document.getElementById('root')
)