// code 0 错误  1 正确

const successModule = (data = '', msg = 'success', code = 1) => {
  return {
    data,
    msg,
    code,
    success: true
  };
};

const errorModule = (data = '', msg = 'error', code = 0) => {
  return {
    data,
    msg,
    code,
    success: false
  };
};

module.exports = {
  successModule,
  errorModule
};
