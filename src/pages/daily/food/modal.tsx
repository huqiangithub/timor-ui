import React from 'react';
import { connect } from 'dva';
import { Modal, Card, Button, Form,Input,Col, Select,DatePicker } from 'antd';
import moment from 'moment';

@Form.create()
export default class FoodModal extends React.Component<any,any>{

  disabledDate = (current: any) => {
    return current && current > moment();
  }
  
  protected saveDaily=()=>{
    const { form, saveDaily } = this.props;
    form.validateFields((err:any, values:any) => {
      if (err) return;
      console.log('Received values of form: ', values);
      saveDaily({...values,date:moment(values.date).format('YYYY-MM-DD')});
    });
  }
  public render(){
    const {hide,visible,initData,form}= this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const dateFormat = 'YYYY-MM-DD';
    return (
      <Modal
        title="新建"
        footer={null}
        destroyOnClose
        width={1000}
        maskClosable={false}
        onCancel={()=>hide()}
        visible={visible}
        className="myModal"
      >
        <div>
          <Card style={{padding:6}}>
            <div style={{marginBottom:10}}>
              <Button type='primary' onClick={this.saveDaily}>保存</Button>
            </div>
            <Form layout='horizontal'>
            <Col span={8}>
                <Form.Item {...formItemLayout} label="日期">
                  {form.getFieldDecorator('date', {
                    initialValue: initData ? moment(initData.date, dateFormat) : moment(),
                  })(
                    <DatePicker disabledDate={this.disabledDate}/>,
                  )}
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item {...formItemLayout} label="体重">
                  {form.getFieldDecorator('weight', {
                    initialValue: initData ? initData.weight : '',
                  })(
                    <Input maxLength={20} />,
                  )}
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item {...formItemLayout} label="心情">
                  {form.getFieldDecorator('mood', {
                    initialValue: initData ? initData.mood : '',
                  })(
                    <Select>
                      <Select.Option key="1">喵~！</Select.Option>
                      <Select.Option key="2">呜~</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item {...formItemLayout} label="表现">
                  {form.getFieldDecorator('performance', {
                    initialValue: initData ? initData.performance : '',
                  })(
                    <Select>
                      <Select.Option key="1">乖咪咪</Select.Option>
                      <Select.Option key="2">傻咪咪</Select.Option>
                      <Select.Option key="3">臭咪咪</Select.Option>
                      <Select.Option key="4">拐咪咪</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                </Col>
                
                <Col span={8}>
                <Form.Item {...formItemLayout} label="身体状态">
                  {form.getFieldDecorator('status', {
                    initialValue: initData ? initData.status : '',
                  })(
                    <Select>
                      <Select.Option key="1">小老斧</Select.Option>
                      <Select.Option key="2">小喵咪</Select.Option>
                      <Select.Option key="3">惨咪咪</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                </Col>
                <Col span={8}>
                <Form.Item {...formItemLayout} label="备注">
                  {form.getFieldDecorator('remark', {
                    initialValue: initData ? initData.remark : '',
                  })(
                    <Input maxLength={20} />,
                  )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="">
                  {form.getFieldDecorator('id', {
                    initialValue: initData ? initData.id : '',
                  })(
                    <div></div>,
                  )}
                </Form.Item>
                </Col>
            </Form>
            <Food/>
          </Card>
        </div>

      </Modal>
    )
  }
}