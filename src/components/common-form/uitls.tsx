import React, { Component, Fragment } from 'react';
import { Row, Col, Form, Button } from 'antd';
import { FormDataProps, placeType, ButtonProps } from './type';
import { RowProps } from 'antd/lib/row';
import { FormItemProps } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { BaseButtonProps } from 'antd/lib/button/button';
import _ from 'lodash';

const FormItem = Form.Item;

/**
 * ----------------------- *
 * @name 渲染FormItem
 */
export function renderFormItem<T>(
  chunkfFormData: FormDataProps[][],
  rowProps: RowProps,
  rowNum: number,
  formItemProps: FormItemProps,
  getFieldDecorator
): React.ReactNode {
  return (
    <Fragment>
      {chunkfFormData.map((item, index) => (
        <Row key={index} {...rowProps}>
          {item.map(item2 =>
            item2.authority ? (
              <Col span={24 / rowNum} key={item2.key}>
                <FormItem
                  style={{ marginBottom: 10 }}
                  {...formItemProps}
                  label={item2.label}
                >
                  {getFieldDecorator(item2.key, item2.options)(item2.node)}
                  {item2.extra}
                </FormItem>
              </Col>
            ) : (
              <Col span={24 / rowNum} key={item2.key}>
                <FormItem
                  style={{ marginBottom: 10 }}
                  {...formItemProps}
                  label={item2.label}
                >
                  {getFieldDecorator(item2.key, item2.options)(item2.node)}
                  {item2.extra}
                </FormItem>
              </Col>
            )
          )}
        </Row>
      ))}
    </Fragment>
  );
}

/**
 * ----------------------- *
 * @name 渲染操作按钮
 */
export function renderFormItemOptions<T>(
  isSubmitBtn: boolean,
  isResetBtn: boolean,
  submitLoading: boolean,
  place: placeType,
  submitText: string,
  resetText: string,
  submitBtnProps: BaseButtonProps,
  resetBtnProps: BaseButtonProps,
  that
) {
  return (
    (isSubmitBtn || isResetBtn) && (
      <Row style={{ marginTop: 10 }} type="flex" justify={place}>
        <Col>
          {isSubmitBtn && (
            <Button
              {...submitBtnProps}
              style={{ marginRight: 10 }}
              htmlType="submit"
              loading={submitLoading}
            >
              {submitText}
            </Button>
          )}
          {isResetBtn && (
            <Button onClick={that.hanldeReset} {...resetBtnProps}>
              {resetText}
            </Button>
          )}
        </Col>
      </Row>
    )
  );
}

/**
 * ----------------------- *
 * @name 默认操作按钮属性
 */
export function initBtnProps<T>(): ButtonProps {
  return {
    place: 'end',
    isSubmitBtn: true,
    isResetBtn: true,
    submitLoading: false,
    submitText: '搜索',
    resetText: '重置',
    submitBtnProps: {
      type: 'primary'
    },
    resetBtnProps: {
      type: 'danger'
    }
  };
}

/**
 * ----------------------- *
 * @name 装换数组项为对象
 * @param {values} 数据源
 * @param {list} 转换列表
 */
interface ListProps {
  originKey: string;
  separateKey: string[];
}
export function separateArrayToKey<T>(values: Object, list: ListProps[]) {
  const cloneValues = _.cloneDeep(values);
  list.forEach(item => {
    const curValue = cloneValues[item.originKey];
    const isArray = curValue && curValue.length > 0;
    item.separateKey.map(
      (item2, index) =>
        (cloneValues[item.separateKey[index]] = isArray ? curValue[index] : '')
    );
    delete cloneValues[item.originKey];
  });
  return cloneValues;
}
