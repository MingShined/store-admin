import { FormItemProps } from 'antd/lib/form';
import { RowProps } from 'antd/lib/row';
import { BaseButtonProps } from 'antd/lib/button/button';
import { Basic } from 'src/types';
import { GetFieldDecoratorOptions, FormProps, WrappedFormUtils } from 'antd/lib/form/Form';
import { AuthorityProps } from 'src/components/Authority';

export declare type placeType = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
type authorityFN = (currentAuthority?: { [key: string]: boolean }) => boolean;
export interface FormDataProps extends Partial<AuthorityProps.Props> {
  key: string;
  options?: GetFieldDecoratorOptions;
  node: React.ReactNode;
  label?: string | React.ReactNode;
  extra?: string | React.ReactNode;
}

export interface ButtonProps {
  place?: placeType;
  isSubmitBtn?: boolean;
  isResetBtn?: boolean;
  submitText?: string;
  resetText?: string;
  submitBtnProps?: BaseButtonProps;
  resetBtnProps?: BaseButtonProps;
  submitLoading?: boolean;
}

export default interface CommonFormProps extends Basic.BaseProps {
  formData: FormDataProps[];
  rowNum?: number;
  formProps?: FormProps;
  formItemProps?: FormItemProps;
  rowProps?: RowProps;
  btnProps?: ButtonProps;
  onSubmit?: (err: any, value: any) => any;
  onReset?: () => any;
  getForm?: (form: WrappedFormUtils) => any;
}
