/**
 * @Create By MingShined
 * @Date 2018/09/11
 * @name 日期选择组件
 */
import React, { Component, Fragment } from 'react';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import { Basic } from 'src/types';
import { formatDate, getInitValue } from './utils';
import { PickerProps } from 'antd/lib/date-picker/interface';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

interface DatePickProps extends Basic.BaseProps, PickerProps {
  type?: 'date' | 'range' | 'time';
  timeFormat?: string;
}

export default class DatePick extends Component<DatePickProps, any> {
  static defaultProps = {
    type: 'date',
    timeFormat: 'HH:mm'
  };
  handleDateChange = async value => {
    const { showTime } = this.props;
    const result = await formatDate(value, showTime);
    this.transmitTimeValue(result);
  };
  handleRangeChange = async value => {
    const { showTime } = this.props;
    const result = await formatDate(value, showTime, true);
    this.transmitTimeValue(result);
  };
  handleTimeChange = async value => {
    const { showTime } = this.props;
    const result = await formatDate(value, showTime, false, true);
    this.transmitTimeValue(result);
  };
  transmitTimeValue = value => {
    this.props.onChange(value);
  };
  render() {
    const { type, onChange, value, showTime, style, timeFormat } = this.props;
    let renderEl = null;
    const format = showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    const myValue = getInitValue(type, value, timeFormat);
    const dateProps = {
      ...this.props,
      format,
      value: myValue
    };
    switch (type) {
      case 'date':
        renderEl = (
          <DatePicker {...dateProps} onChange={this.handleDateChange} />
        );
        break;
      // case 'month':
      //   renderEl = <MonthPicker onChange={this.handleOnchange} value={value}/>;
      //   break;
      // case 'week':
      //   renderEl = <WeekPicker onChange={this.handleOnchange} value={value}/>;
      //   break;
      case 'range':
        renderEl = (
          <RangePicker {...dateProps} onChange={this.handleRangeChange} />
        );
        break;
      case 'time':
        renderEl = (
          <TimePicker
            {...this.props}
            format={timeFormat}
            onChange={this.handleTimeChange}
            value={myValue}
          />
        );
        break;
      default:
        break;
    }
    return <Fragment>{renderEl}</Fragment>;
  }
}
