import React from "react";
import {
  Table,
  PageHeader,
  Button,
  Drawer,
  Form,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon,
  Tag,
  Popconfirm
} from "antd";
import { connect } from "react-redux";
import {
  getDataCustomer,
  addCustomer,
  deleteCustomer
} from "../redux/actions/customerAction";
import moment from "moment";
const { Option } = Select;
const ButtonGroup = Button.Group;

class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleDrawer: false
    };
    this.columnCustomer = [
      {
        title: "STT",
        dataIndex: "stt",
        render: (text, record, index) => {
          return index + 1;
        },
        width: "5%"
      },
      {
        title: "Name",
        dataIndex: "name",
        sorter: true,
        render: name => name.charAt(0).toUpperCase() + name.slice(1),
        width: "15%"
      },
      {
        title: "Gender",
        dataIndex: "gender",
        render: gender => {
          if (gender === "female") {
            return (
              <Tag color="#5CD8B4">
                {" "}
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Tag>
            );
          } else {
            // male
            return (
              <Tag color="#DE5BAB">
                {" "}
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Tag>
            );
          }
        },
        width: "10%"
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "20%"
      },
      {
        title: "Phone",
        dataIndex: "phone",
        width: "10%"
      },
      {
        title: "Service rent",
        dataIndex: "serviceRent",
        render: serviceRent => {
          switch (serviceRent) {
            case "office":
              return "Office";
            case "hr":
              return "HR";
            case "booking":
              return "Booking";
            case "wiki":
              return "Wiki";
            default:
              return serviceRent;
          }
        },
        width: "10%"
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        render: date => {
          return moment(date).format("DD-MM-YYYY HH:mm:ss");
        },
        width: "15%"
      },
      {
        title: "Action",
        dataIndex: "operation",
        render: (text, record) => {
          return (
            <div>
              <Button onClick={() => this.handleEditRow(record)}>
                <Icon type="edit" theme="twoTone" />
              </Button>
              <Popconfirm
                title="Sure to remove row?"
                onConfirm={() => this.handleRemoveRow(record._id)}
              >
                <Button>
                  <Icon type="delete" theme="twoTone" twoToneColor="#D02A2F" />
                </Button>
              </Popconfirm>
            </div>
          );
        },
        width: "10%"
      }
    ];
  }

  componentDidMount() {
    this.props.getDataCustomer();
  }

  showDrawer = () => {
    this.setState({
      visibleDrawer: true
    });
  };

  handleEditRow = record => {
    console.log("edit record ", record);
    this.showDrawer();
  };

  handleRemoveRow = id => {
    console.log("remove ", id);
    this.props.deleteCustomer(id);
  };

  onClose = () => {
    this.setState({
      visibleDrawer: false
    });
    this.handleReset();
  };

  handleTableChange = (pagination, filters, sorter) => {
    console.log("handleTableChange: ", pagination, filters, sorter);
    this.props.getDataCustomer({
      pageSize: pagination.pageSize,
      pageCurrent: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // send data
        this.props.addCustomer(values);
        this.onClose();
      } else {
        console.log("error: ", err);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields(); // clear All data in form
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { customer } = this.props;
    // console.log('ctm: ', customer);
    return (
      <div style={{ background: "#fff", padding: 24 }}>
        <PageHeader
          title="B???ng kh??ch h??ng"
          extra={[
            <Button key="add" type="primary" onClick={this.showDrawer}>
              <Icon type="plus" /> Th??m kh??ch h??ng
            </Button>
          ]}
        />
        <br />
        <Table
          columns={this.columnCustomer}
          rowKey={record => record._id}
          dataSource={customer.data}
          pagination={customer.paginationCustomer}
          loading={customer.loading}
          onChange={this.handleTableChange}
        />
        <Drawer
          title="Th??m kh??ch h??ng m???i"
          width={720}
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visibleDrawer}
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="T??n">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "H??y nh???p t??n kh??ch h??ng!" }
                    ]
                  })(<Input placeholder="Nh???p t??n kh??ch h??ng" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email">
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "Kh??ng ????ng ?????nh d???ng Email !"
                      },
                      { required: true, message: "Nh???p email kh??ch h??ng !" }
                    ]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      addonBefore="http://"
                      placeholder="Nh???p email ??? ????y"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Gi???i t??nh">
                  {getFieldDecorator("gender", {
                    rules: [{ required: true, message: "H??y ch???n gi???i t??nh" }]
                  })(
                    <Select placeholder="Ch???n gi???i t??nh">
                      <Option value="female">Nam</Option>
                      <Option value="male">N???</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="S??? ??i???n tho???i">
                  {getFieldDecorator("phone", {
                    rules: [
                      {
                        required: true,
                        message: "H??y nh???p s??? ??i???n tho???i kh??ch h??ng"
                      }
                    ]
                  })(<Input placeholder="Nh???p s??? ??i???n tho???i kh??ch h??ng" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Thu?? d???ch v???">
                  {getFieldDecorator("service", {
                    rules: [
                      { required: true, message: "Ch???n g??i dich v??? thu??" }
                    ]
                  })(
                    <Select placeholder="Ch???n g??i d???ch v??? thu??">
                      <Option value="office">Office</Option>
                      <Option value="booking">Booking</Option>
                      <Option value="wiki">Wiki</Option>
                      <Option value="HR">HR</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="????ng k??">
                  {getFieldDecorator("dateTime", {
                    rules: [
                      { required: false, message: "Ch???n kho???ng th???i gian thu??" }
                    ]
                  })(
                    <DatePicker.RangePicker
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="M?? t???">
                  {getFieldDecorator("description", {
                    rules: [
                      { required: false, message: "M?? t??? th??m v??? kh??ch h??ng" }
                    ]
                  })(
                    <Input.TextArea
                      rows={4}
                      placeholder="M?? t??? th??m v??? kh??ch h??ng"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <div className="footer-drawer">
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                H???y
              </Button>
              <Button type="primary" htmlType="submit">
                L??u
              </Button>
            </div>
          </Form>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    customer: state.customer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDataCustomer: params => dispatch(getDataCustomer(params)),
    addCustomer: params => dispatch(addCustomer(params)),
    deleteCustomer: id => dispatch(deleteCustomer(id))
  };
}

const CustomerPage = Form.create({ name: "add_customer" })(Customer);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerPage);
