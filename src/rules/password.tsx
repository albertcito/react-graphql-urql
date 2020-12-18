import { RuleObject } from 'antd/lib/form';

const rulePass = (
  getFieldValue: (name: string) => string,
  field: string,
) => ({
  validator(_: RuleObject, value: string) {
    if (!value || getFieldValue(field) === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('The two passwords that you entered do not match!'));
  },
});

export default rulePass;
