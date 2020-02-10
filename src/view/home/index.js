
import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon, Breadcrumb, Row, Col, Statistic, Button, Input, Form, Table, Badge, Select} from 'antd';
// import '../../common/common';
import './index.less';
import * as axios from '../../lib/axios';

const { Header, Sider, Content } = Layout;
const { Countdown } = Statistic;
const { Option } = Select;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
const valueEnum = {
  0: {
    text: '不可租赁',
    status: 'default',
  },
  1: {
    text: '可租赁',
    status: 'processing',
  },
  2: {
    text: '已租赁',
    status: 'success',
  },
  3: {
    text: '将到期',
    status: 'error',
  },
  4: {
    text: '已锁定',
    status: 'error',
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      greeting: '登陆',
      loading: false,
      collapsed: false,
      dataSource: [],
      letAreaSize: 0, // 可招商面积
      roomNum: 0, // 房间数量
      letRate: 0, // 出租率
      emptySeatNum: 0, // 空置
      current: 0,
      total: 0,
      pageSize: 10,
      formData: {
        name: null,
        type: '1'
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.searchForm = this.searchForm.bind(this);
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
  pageChange(current, pageSize) {
    this.setState({
      current: current,
      pageSize: pageSize,
    }, () => {
        this.fetchList();
    });
  }
  searchForm(that) {
    that.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({
          formData: { name: values.name, type: values.type }
        }, () => {
            this.fetchList();
        })
      }
    });
  }
  fetchList() {
    console.log(this.state.formData);
    let { current, pageSize, formData } = this.state;
    this.setState({
      loading: true
    });
    let options = {
      'floorId': 0,
      'name': formData.name,
      'type': formData.type,
      'page': current,
      'rows': pageSize,
    }
    axios.post('/console/room/price', options).then(res => {
      if (res.success) {
        this.setState({
          dataSource: res.data.list,
          current: res.data.pageNum,
          pageSize: res.data.pageSize,
          total: res.data.total,
          loading: false
        })
      }
    })
  }
  componentDidMount() {
    this.fetchList();
    axios.get('/console/room/statistics?id=-1').then(res => {
      if (res.success) {
        this.setState({
          letAreaSize: res.data.letAreaSize,
          roomNum: res.data.roomNum,
          letRate: res.data.letRate,
          emptySeatNum: res.data.emptySeatNum,
        })
      }
    })
  }
  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'name'
      },
      {
        title: '所属项目',
        dataIndex: 'projectName'
      },
      {
        title: '房源类型',
        dataIndex: 'typeName'
      },
      {
        title: '房源状态',
        render: (_, record) => (
          <>
            <Badge status={valueEnum[record.leaseStatus].status} text={record.leaseStatusName} />
          </>
        )
      },
      {
        title: '房间原价',
        dataIndex: 'originalPrice'
      },
      {
        title: '座位数',
        dataIndex: 'seatNum'
      }
    ];
    return (
      <div className="home" >
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span>空间管理</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>项目管理</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>房源管理</span>
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
                  <Statistic title="可招商面积 (㎡)" value={this.state.letAreaSize} precision={2} />
                  <Button style={{ marginTop: 16 }} type="primary">
                    添加房间
                  </Button>
                </Col>
                <Col span={6}>
                  <Statistic title="可出租房间" value={this.state.roomNum} prefix={<Icon type="home" />} />
                </Col>
                <Col span={6}>
                  <Statistic title="出租率" value={this.state.letRate} suffix="%" />
                </Col>
                <Col span={6}>
                  <Countdown title="截止时间" value={deadline} format="D 天 H 时 m 分 s 秒" />
                </Col>
              </Row>
              <WrappedSearchForm onChange={this.searchForm} formData={this.state.formData}/>
              <Row style={{
                marginBottom: 24,
                background: '#fff',
              }}>
                <div className="house-header">
                  <div className="header-title">查询表格</div>
                  <div className="header-option">
                    <Button type="primary">操作</Button>
                  </div>
                </div>
                <Table pagination={{ current: this.state.current, pageSize: this.state.pageSize, total: this.state.total, onChange: this.pageChange }} loading={this.state.loading} rowKey={(row) => row.id} columns={columns} rowSelection={{}} dataSource={this.state.dataSource}/>
              </Row>
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
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  handleSearch(e) {
    e.preventDefault();
    if (this.props.onChange) {
      this.props.onChange(this);
    }
  }
  handleSelectChange(e) {
    this.props.form.setFieldsValue({
      type: e,
    });
    if (this.props.onChange) {
      this.props.onChange(this);
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let { formData } = this.props;
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row style={{
          padding: 24,
          marginBottom: 24,
          background: '#fff',
        }}>
          <Col span={7}>
            <Form.Item label="房间编号">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: false,
                    message: 'Input something!',
                  },
                ],
                initialValue: formData.name
              })(<Input placeholder="请输入房间编号" autoComplete="off"/>)}
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item label="房源类型">
              {getFieldDecorator('type', {
                rules: [
                  {
                    required: false,
                    message: 'Input something!',
                  },
                ],
                initialValue: formData.type
              })(
                <Select
                  placeholder="请选择房源类型"
                  onChange={this.handleSelectChange}
                >
                  <Option value="1">办公室</Option>
                  <Option value="2">会议室</Option>
                  <Option value="3">商铺</Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={3} offset={6}>
            <Form.Item>
              <Button type="primary" onClick={this.handleSearch}>查询</Button>
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