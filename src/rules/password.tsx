const rulePass = (getFieldValue: any, field: string) => {
  return ({
    validator(rule: any, value: any) {
      if (!value || getFieldValue(field) === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    },
  });
};

export default rulePass;
