import BigNumber from 'bignumber.js';
/**
 * 深度复制 Object 或 Array
 * @param {Array | Object} _data // 需要复制的原始数据
 * @returns {Array | Object}
 */
(function() {
  Object.copyArrObj = function(_data) {
    if (_data) {
      const _type = Object.prototype.toString.call(_data);
      if (_type === '[object Array]' || _type === '[object Object]') {
        return JSON.parse(JSON.stringify(_data));
      }
      return _data;
    }
    return _data;
  };
})();

/**
 * 添加 Object.keys 方法
 * @param { Object} _data
 * @returns { Array }
 */
(function() {
  if (!Object.keys) {
    Object.keys = function(_data) {
      if (_data) {
        const _type = Object.prototype.toString.call(_data);
        if (_type === '[object Object]') {
          let _keyArr = [];
          for (let key in _data) {
            _keyArr.push(key);
          }
          return _keyArr;
        }
      }
      throw Error('The argument must be an Object');
    };
  }
})();

/**
 * 添加 Object.values 方法
 * @param { Object} _data
 * @returns { Array }
 */
(function() {
  if (!Object.values) {
    Object.values = function(_data) {
      if (_data) {
        const _type = Object.prototype.toString.call(_data);
        if (_type === '[object Object]') {
          let _valuesArr = [];
          for (let key in _data) {
            _valuesArr.push(_data[key]);
          }
          return _valuesArr;
        }
      }
      throw Error('The argument must be an Object');
    };
  }
})();

/**
 * 添加币种算力转换方法
 * @param { Number} size 需要转换数字
 * @param { Number} _toFixed 保留小数位数
 * @returns { Object } number => 转换后的数字 digit => 转换后的单位
 */
(function() {
  Object.formatHashSize = function(size, _toFixed = 2) {
    if (!size || Number(size).toString() === 'NaN') {
      // throw Error('The argument must be a Number');
      return { number: 0, digit: 'MH/s' };
    }
    const _type = Object.prototype.toString.call(Number(size));
    if (_type !== '[object Number]') {
      // throw Error('The argument must be a Number');
      return { number: 0, digit: 'MH/s' };
    }
    if (Number(size) < 1000) {
      return { number: Number(size).toFixed(_toFixed), digit: 'MH/s' };
    }
    let scale = 1000;
    const digitList = ['GH/s', 'TH/s', 'PH/s', 'EH/s'];
    let _integer = Number(size) / scale;
    let digit = 0;
    while (_integer > scale) {
      _integer = Math.round(_integer / scale);
      digit++;
    }
    // return { number: _integer.toFixed(_toFixed), digit: digitList[digit] };
    const _number = new BigNumber(_integer).dp(_toFixed, 1).valueOf();
    return { number: _number, digit: digitList[digit] };
  };
})();

/**
 * 功率换算
 * @param { Number} size 需要转换数字
 * @param { Number} _toFixed 保留小数位数
 * @returns { Object } number => 转换后的数字 digit => 转换后的单位
 */
(function() {
  Object.powerConversion = function(size, _toFixed = 2) {
    if (!size || Number(size).toString() === 'NaN') {
      // throw Error('The argument must be a Number');
      return { number: 0, digit: 'w' };
    }
    const _type = Object.prototype.toString.call(Number(size));
    if (_type !== '[object Number]') {
      // throw Error('The argument must be a Number');
      return { number: 0, digit: 'w' };
    }
    if (Number(size) < 1000) {
      return { number: Number(size).toFixed(_toFixed), digit: 'w' };
    }
    let scale = 1000;
    const digitList = ['kw', 'mw'];
    let _integer = Number(size) / scale;
    let digit = 0;
    while (_integer > scale) {
      _integer = Math.round(_integer / scale);
      digit++;
    }
    // return { number: _integer.toFixed(_toFixed), digit: digitList[digit] };
    const _number = new BigNumber(_integer).dp(_toFixed, 1).valueOf();
    return { number: _number, digit: digitList[digit] };
  };
})();

/**
 * 内存换算
 * @param { Number} size 需要转换数字
 * @param { Number} _toFixed 保留小数位数
 * @returns { Object } number => 转换后的数字 digit => 转换后的单位
 */
(function() {
  Object.memoryConversion = function(size, _toFixed = 2) {
    if (!size || Number(size).toString() === 'NaN') {
      // throw Error('The argument must be a Number');
      return { number: 0, digit: 'MB' };
    }
    const _type = Object.prototype.toString.call(Number(size));
    if (_type !== '[object Number]') {
      // throw Error('The argument must be a Number');
      return { number: 0, digit: 'MB' };
    }
    if (Number(size) < 1024) {
      return { number: Number(size).toFixed(_toFixed), digit: 'MB' };
    }
    let scale = 1024;
    const digitList = ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let _integer = Number(size) / scale;
    let digit = 0;
    while (_integer > scale) {
      _integer = Math.round(_integer / scale);
      digit++;
    }
    // return { number: _integer.toFixed(_toFixed), digit: digitList[digit] };
    const _number = new BigNumber(_integer).dp(_toFixed, 1).valueOf();
    return { number: _number, digit: digitList[digit] };
  };
})();

/**
 * HASH 算力转换
 * @param { Number} size 需要转换数字
 * @param { Number} _toFixed 保留小数位数
 * @returns { Object } number => 转换后的数字 digit => 转换后的单位
 */
(function() {
  Object.hashConversion = function(size, _toFixed = 2) {
    if (!size || Number(size).toString() === 'NaN') {
      // throw Error('The argument must be a Number');
      return { number: 0, digit: 'M' };
    }
    const _type = Object.prototype.toString.call(Number(size));
    if (_type !== '[object Number]') {
      // throw Error('The argument must be a Number');
      return { number: 0, digit: 'M' };
    }
    if (Number(size) < 1000) {
      return { number: Number(size).toFixed(_toFixed), digit: 'M' };
    }
    let scale = 1000;
    const digitList = ['G', 'T', 'P', 'E'];
    let _integer = Number(size) / scale;
    let digit = 0;
    while (_integer > scale) {
      _integer = Math.round(_integer / scale);
      digit++;
    }
    // return { number: _integer.toFixed(_toFixed), digit: digitList[digit] };
    const _number = new BigNumber(_integer).dp(_toFixed, 1).valueOf();
    return { number: _number, digit: digitList[digit] };
  };
})();

/**
 * 计算百分率
 * @param {Number } molecular // 分子
 * @param {Number } denominator // 分母
 * @param {Number } _toFixed // 保留小数
 * @returns {String}
 */
(function() {
  Object.percentage = function(molecular = 0, denominator = 0, _toFixed = 0) {
    const _typeOne = Object.prototype.toString.call(Number(molecular));
    const _typeTwo = Object.prototype.toString.call(Number(denominator));
    const _typeThree = Object.prototype.toString.call(_toFixed);
    let _toFixedNumber = _toFixed;
    if (_typeOne !== '[object Number]' || _typeTwo !== '[object Number]') {
      throw Error('The arguments must be Number');
    }
    if (_typeThree !== '[object Number]') {
      _toFixedNumber = 0;
    }
    if (denominator === 0) {
      return `${((molecular || 0) * 100).toFixed(_toFixedNumber)}%`;
    } else {
      return `${((molecular / denominator) * 100).toFixed(_toFixedNumber)}%`;
    }
  };
})();
/**
 * 占比
 * @param {Number } molecular // 现有
 * @param {Number } denominator // 总数
 * @param {Number } _toFixed // 保留小数
 * @returns {Number}
 */
(function() {
  Object.proportion = function(molecular, denominator, _toFixed = 2) {
    const _typeOne = Object.prototype.toString.call(Number(molecular));
    const _typeTwo = Object.prototype.toString.call(Number(denominator));
    const _typeThree = Object.prototype.toString.call(_toFixed);
    let _toFixedNumber = _toFixed;
    if (!molecular && !denominator) {
      throw Error('The arguments must be Number');
    }
    if (_typeOne !== '[object Number]' || _typeTwo !== '[object Number]') {
      throw Error('The arguments must be Number');
    }
    if (_typeThree !== '[object Number]') {
      _toFixedNumber = 0;
    }
    if (denominator === 0) {
      return Number((molecular || 0).toFixed(_toFixedNumber));
    } else {
      return Number((molecular / denominator).toFixed(_toFixedNumber));
    }
  };
})();
