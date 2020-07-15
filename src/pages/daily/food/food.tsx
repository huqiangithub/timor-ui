import { Card, Typography,Table,Form,
  Button,
  Divider,Popover,Popconfirm,Icon } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Photo.less';
import React, { Component, ReactElement,Fragment } from 'react';
import { connect } from 'dva';
import FoodModal from '@/pages/daily/food/modal'

@connect(({ daily, loading }: any) => ({
  daily,
  loading: loading.models.daily,
}))
export default class Food extends Component{

  public state={
    selected:{},
    modalVisible:false,
  }
  componentDidMount(){
    this.fetchData();
  }

  protected fetchData=()=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'daily/fetch',
      payload: {
        id:1,
      },
    });
  }

  protected columns = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '日期',
      dataIndex: 'date',
    },
    {
      title: '心情',
      dataIndex: 'moodDesp',
    },
    {
      title: '表现',
      dataIndex: 'performanceDesp',
    },
    {
      title: '身体状态',
      dataIndex: 'statusDesp',
    },
    {
      title: '体重(kg)',
      dataIndex: 'weight',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    }
  ]

  protected onSelect=(record:any)=>{
    console.log("record",record);
  }

  public hide=()=>{
    this.setState({modalVisible:false})
  }

  public show=()=>{
    this.setState({modalVisible:true})
  }

  public saveDaily=(payload:any)=>{
    console.log("payload",payload)
    const { dispatch } = this.props;
    dispatch({
      type: 'daily/update',
      payload,
    });
    this.hide();
  }

  public add=()=>{
    this.setState({
      selected:{}
    },()=>this.show())
  }

  public render(): ReactElement {
    const {daily:{dataSource}} = this.props
    const {selected,modalVisible}=this.state;
    console.log("modalVisible",modalVisible)
    const rowSelection={
      onSelect:this.onSelect,
    }
    return(
      <div>
        <div style={{marginBottom:10}}>
          <Button type='primary' icon='plus' onClick={this.add}>新增</Button>
          <Button type='default' style={{marginLeft:10}}>修改</Button>
          <Button type='danger' style={{marginLeft:10}}>删除</Button>
        </div>
        <Table
          columns={this.columns}
          dataSource={dataSource}
          rowKey='id'
          rowSelection={rowSelection}
          rowClassName = {(record) => {
            console.log("recordddd",record)
            return record.id === selected.id ? 'selected-table-row' : '';
          }}
          onRow={(record,index)=>{
            return {
              onClick:()=>{
                this.setState({selected:record});
              },
              onDoubleClick:e=>{
                this.setState({modalVisible:true})
              }
            }
          }}
          />
          {modalVisible?
          <FoodModal
            initData={selected}
            hide={this.hide}
            visible={modalVisible}
            saveDaily={this.saveDaily}
          />:null
        }
      </div>
    )
  }
}