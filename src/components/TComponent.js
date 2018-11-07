import React from 'react';
import {
  // Select,
  Slider,
  Button,
  Table,
  message,
  Card
 } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios'
import safeEval from 'safe-eval'
import { TObject } from 'taskit-js-sdk'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as dialogActions from '../actions/dialogActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

var request = axios.create({
  baseURL: (window.location && window.location.origin && window.location.origin.indexOf('localhost') === -1
    ? window.location.origin
    : 'http://sandbox.tas-kit.com'
  ),
})

// const Option = Select.Option;

class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { columns: []}
    this.props = props;
    this.onChange = this.onChange.bind(this);
    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent(){
    if (this.props.type === 'picklist')
      this.renderPicklist();
    else if (this.props.type === 'rangeSlider') {
      this.renderRangeSlider();
    }
  }

  getValues(){
    let values = this.props.values;
    let valueRange = this.props.valueRange;
    if (valueRange){
      values = [];
      let start = valueRange.min;
      let end = valueRange.max;
      let step = valueRange.step;
      for (let i = start; i <= end; i+=step){
        values.push(i);
      }
    }
    return values;
  }

  renderRangeSlider(){
    let valueRange = this.props.valueRange;
    let value = this.state.value;
    if (value === undefined){
      value = this.props.defaultValue;
    }
    this.props.properties[this.props.propertyStart] = value[0];
    this.props.properties[this.props.propertyEnd] = value[1];
    this.component = <div>
      <Slider
        range
        min={valueRange.min}
        max={valueRange.max}
        step={valueRange.step}
        marks={this.props.marks}
        defaultValue={this.props.defaultValue}
        tipFormatter={this.props.format}
        onChange={this.onChange} />
      <p>{this.props.format(value[0]) + ' ~ ' + this.props.format(value[1])}</p>
      </div>
  }

  onChange(value, child){
      if (this.props.type === 'picklist'){
        this.setState({value: value.target.value});
      }
      else if (this.props.type === 'rangeSlider') {
        this.setState({value: value});
      }
  }

  renderPicklist(){
    let values = this.getValues();
    let options = [];
    let format = this.props.format;
    if (format === undefined){
      format = (value) => value;
    }
    let value = this.state.value;
    if (value === undefined){
      value = values[0];
    }
    this.props.properties[this.props.propertyValue] = value;
    for (let value of values){
      options.push(<MenuItem key={value} value={value}>{format(value)}</MenuItem>);
    }
    this.component = (<Select value={value} onChange={this.onChange}>
      {options}
      </Select>);
  }

  render(){
    let headerStyle = {
      display: "inline-block",
      marginRight: "10px"
    }
    this.renderComponent();
    return (<div style={{margin: "10px"}}>
      <h3 style={headerStyle}>{this.props.name}</h3>
      <p style={headerStyle}>{this.props.description}</p>
      {this.component}
    </div>);
  }
}

class TComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cmp: {
        name: 'Name',
        description: 'Description',
        editor: {}
      },
      dataSource: [],
      properties: {}
    };
    this.editorComponents = [];
    this.addRecord = this.addRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.processDataSource = this.processDataSource.bind(this);
    request({
      method: 'GET',
      url: `/web/app/${props.app}/component/${props.cmp}.js`,
      withCredentials: true
    }).then(resp => {
      let cmp = safeEval(resp.data);
      this.setState({cmp: cmp});
      this.tobject = new TObject.TObject({oid:props.oid, key:props.platformRootKey});
      this.tobject.getChildren().then(children => {
        let dataSource = [];
        for (let child of children){
          child.key = child.oid;
          dataSource.push(child);
        }
        this.setState({dataSource: dataSource});
      }).catch(err => {
        message.error("Fail to get data: " + JSON.stringify(err.response.data));
      });
    })
  }

  renderEditorComponents(cmp){
    this.editorComponents = [];
    for (let key in cmp.editor){
      let component = cmp.editor[key];
      component.properties = this.state.properties;
      this.editorComponents.push(<EditorComponent key={key} { ...component } />);
    }
    return this.editorComponents;
  }

  getPicklistColumn(picklist){
    return [{
      title: picklist.propertyName,
      dataIndex: picklist.propertyValue,
      key: picklist.propertyValue,
    }];
  }

  getRangeSliderColumn(rangeSlider){
    return [{
      title: rangeSlider.nameStart,
      dataIndex: rangeSlider.propertyStart,
      key: rangeSlider.propertyStart,
    },{
      title: rangeSlider.nameEnd,
      dataIndex: rangeSlider.propertyEnd,
      key: rangeSlider.propertyEnd,
    }];
  }

  getTableColumns(cmp){
    let columns = [];
    for (let component of Object.values(cmp.editor)){
      if (component.type === "picklist"){
        columns = columns.concat(this.getPicklistColumn(component));
      }
      else if (component.type === "rangeSlider") {
        columns = columns.concat(this.getRangeSliderColumn(component));
      }
    }
    columns.push({ title: 'Action', dataIndex: '', key: 'x', render: (props) => {
      return <Button type="danger" ghost={true} onClick={()=>this.deleteRecord(props.key)}>Delete</Button>
    }});
    return columns;
  }

  processDataSource(cmp){
    let dataSource = [];
    for (let data of this.state.dataSource){
      let record = { ...data }
      for (let component of Object.values(cmp.editor)){
        if (component.format){
          if (component.type === "picklist"){
            let value = record[component.propertyValue];
            record[component.propertyValue] = component.format(value);
          }
          else if (component.type === "rangeSlider") {
            let start = record[component.propertyStart];
            let end = record[component.propertyEnd];
            record[component.propertyStart] = component.format(start);
            record[component.propertyEnd] = component.format(end);
          }
        }
      }
      dataSource.push(record);
    }
    return dataSource;
  }

  deleteRecord(key){
    if (this.tobject){
      this.tobject.removeChildren([key]).then(resp => {
        let dataSource = this.state.dataSource.filter(record => record.key !== key);
        this.setState({ dataSource });
      }).catch(err => {
        message.error("Fail to delete data: " + JSON.stringify(err.response.data));
      });
    }
  }

  addRecord(){
    if (this.tobject !== undefined){
      let record = { ...this.state.properties };
      this.tobject.addChildren([{
        labels: this.state.cmp.labels,
        properties: record}]).then(availNodes => {
        record.key = availNodes[0].oid;
        let dataSource = this.state.dataSource;
        dataSource.push(record);
        this.setState({ dataSource });
      }).catch(err => {
        message.error("Fail to add data: " + JSON.stringify(err.response.data));
      });
    }
  }

  render(){
    let cmp = this.state.cmp;
    this.renderEditorComponents(cmp);
    let addButtonStyle = {
      margin: "10px"
    }
    let columns = this.getTableColumns(cmp);

    return (
      <Card
        title={this.state.cmp.name}
        extra={this.state.cmp.description}
      >
        <div>
          {this.editorComponents}
          <Button onClick={this.addRecord} style={addButtonStyle}>Add</Button>
        </div>
        <div>
          <Table dataSource={this.processDataSource(cmp)} columns={columns} />
        </div>
      </Card>
    );
  }
}

class TComponentManager extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      components: {},
      platformRootKey: props.currentUserManager.platformRootKey
    };
    request({
      method: 'GET',
      url: `/api/v1/taskservice/task/${props.tid}/${props.sid}/component/`,
      withCredentials: true
    }).then(resp => {
      this.setState({ components: resp.data.components });
      if (Object.keys(resp.data.components).length > 0 &&
        (this.state.platformRootKey === undefined ||
        this.state.platformRootKey === null ||
        this.state.platformRootKey === '')){
        const { toggleMiniAppPassword } = this.props.actions;
        toggleMiniAppPassword(props => this.setState({platformRootKey: props.currentUserManager.platformRootKey}));
      }
    }).catch(err => {
      message.error('Unable to load customer components: ' + JSON.stringify(err.response.data));
    })
  }

  render(){
    let tcomponents = []
    if (!(this.state.platformRootKey === undefined ||
      this.state.platformRootKey === null ||
      this.state.platformRootKey === '')){
      for (let component of Object.values(this.state.components)){
        component.key = component.oid;
        component.platformRootKey = this.state.platformRootKey;
        tcomponents.push(<TComponent { ...component } />);
      }
    }
    return (<div>
      {tcomponents}
      </div>)
  }
}


const mapStateToProps = state => ({
  miniAppManager: state.miniAppManager,
  dialogManager: state.dialogManager,
  currentUserManager: state.currentUserManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...dialogActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TComponentManager);
