const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 获取链接拼接参数
const getQueryString = (name) => {
  const result = window.location.href.match(new RegExp(`[?&]${name}=([^&]+)`, 'i'));
  if (result === null || result.length < 1) {
      return '';
  }
  return result[1];
}

// 字符串根据某个字符，分割字符串，重组为数组或者对象
// StringText--分割的字符串，filtervalue--分割条件字段内容，toType--分割重组后的内容，返回的类型，String，Array，Object
const recomBinationString = (StringText, options = {filtervalue, toType}) => {
  let newstrig = "";
  let newStringText = StringText;
  const filtervalue = options.filtervalue;
  const toType = options.toType ? options.toType : 'String';
  if(toType === 'String') { // 返回字符串','分隔
    newstrig = newStringText.split(filtervalue).join();
  }
  if(toType === 'Array') { // 返回数组
    newstrig = newStringText.split(filtervalue);
  }
  if(toType === 'Object') { // 返回键值对象
    newstrig = [];
    const arrayStrig = newStringText.split(filtervalue);
    for (let [index, elem] of arrayStrig.entries()) {
      newstrig.push({key: index, name: elem});
      // console.log(index, elem);
    }
  }
  return newstrig;
}

// 字符串截取指定字符前，后，中间部分等，注意：当截取条件内容里有反斜杠/、\等特殊字符时，记得统一前面加上"\"来转义
// 注意：当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）
// StringText--截取的字符串，对象字段，before--截取这个字符条件之前内容，current--截取当前指定内容，after--截取这个字符之后内容，before && after--截取中间内容
const interceptString  = (StringText, options = {before, current, after}) => {
  let newstrig = "";
  let newStringText = StringText;
  const before = String(options.before) ? String(options.before) : "";
  const current = String(options.curren) ? String(options.current) : ""; // 指定内容匹配截取
  const after = String(options.after) ? String(options.after) : "";
  (before && !current && !after) ? newstrig = newStringText.match(new RegExp(`\(\\S*)${before}`))[1] : "";
  (!before && current && !after) ? newstrig = newStringText.match(new RegExp(`${current}`))[0] : "";
  (!before && !current && after) ? newstrig = newStringText.match(new RegExp(`${after}(\\S*)`))[1] : "";
  (before && !current && after) ? newstrig = newStringText.match(new RegExp(`${before}(\\S*)${after}`))[1] : "";
  return newstrig;
}

// 数组浅拷贝，直接赋值
const lightCopyArray = (orginArray) => {
  return orginArray
}
// 数组深拷贝，这种方法使用较为简单，可以满足基本的深拷贝需求，而且能够处理JSON格式能表示的所有数据类型，
// 但是对于正则表达式类型、函数类型等无法进行深拷贝(而且会直接丢失相应的值)。
const deepCopyArray = (orginArray) =>{
  return JSON.parse(JSON.stringify(orginArray)) 
}

// 对象浅拷贝，直接赋值
const lightCopyObject = (orginObject) => {
  return orginObject
}
// 对象深拷贝，这种方法使用较为简单，可以满足基本的深拷贝需求，而且能够处理JSON格式能表示的所有数据类型，
// 但是对于正则表达式类型、函数类型等无法进行深拷贝(而且会直接丢失相应的值)。
const deepCopyObject = (orginObject) =>{
  return JSON.parse(JSON.stringify(orginObject)) 
}

// 数组升序排序 从小到大
const ascendingOrderArray = (orginArray) => {
  return orginArray.sort((a,b) =>{return a - b})
}
// 数组降序排序 从大到小
const descendingOrderArray = (orginArray) => {
  return orginArray.sort((a,b) =>{return b - a})
}
// 数组对象降序排序 从小到大，orginArray--排序的数组对象，orderkey--排序的字段条件，ordervalue--排序的内容--Number，String，Bool等
const ascendingOrderArrayObject = (orginArray, orderkey, ordervalue) => {
  return orginArray.sort((a,b) =>{return a[orderkey] - b[orderkey]})
}
// 数组对象降序排序 从大到小，orginArray--排序的数组对象，orderkey--排序的字段条件，ordervalue--排序的内容--Number，String，Bool等
const descendingOrderArrayObject = (orginArray, orderkey, ordervalue) => {
  return orginArray.sort((a,b) =>{return b[orderkey] - a[orderkey]})
}

// 简单一层数组过滤，筛选符合条件的所有元素，返回筛选的元素，orginArray--筛选的数组，filtervalue--筛选的内容--Number，String，Bool等
const filterArray = (orginArray, filtervalue) => {
  const newdata = orginArray.filter((item, k) => { return item === filtervalue});
  return newdata;
}

// 数组对象过滤，筛选符合条件的所有元素，返回筛选的数组对象集合，orginArray--筛选的数组，filterkey--筛选的字段条件，filtervalue--筛选的内容--Number，String，Bool，Date，Array，Object等
const filterArrayObject = (orginArray, filterkey, filtervalue) => {
  const newdata = orginArray.filter((item, k) => { return item[filterkey] === filtervalue});
  return newdata;
}

// 简单一层数组匹配修改，添加，删除，orginArray--筛选的数组
// 对象字段，filterindex--更新的下标，filtervalue--更新的内容--Number，String，Bool，Date，Array，Object等
// operationtype--"add"，"delete"，"update"，操作类型
const updateArray = (orginArray, options = {filterindex, filtervalue, operationtype,  data}) => {
  let newArray = JSON.parse(JSON.stringify(orginArray));
  const filterindex = options.filterindex !== undefined ? options.filterindex : "";
  const filtervalue = options.filtervalue !== undefined ? options.filtervalue : "";
  const operationtype = options.operationtype ? options.operationtype : "";
  const data = String(options.data) ? options.data : "";
  if ((!String(filterindex) && !String(filtervalue)) || !String(operationtype) || !String(data)) {
    return newArray;
  }
  // 有下标，优先取下标匹配，操作更新
  (String(filterindex) && operationtype === "add") ? newArray.splice(filterindex,0,data) : "";
  (String(filterindex) && operationtype === "delete") ? newArray.splice(filterindex,1) : "";
  (String(filterindex) && operationtype === "update") ? newArray.splice(filterindex,1,data) : "";
  // 根据value值匹配，操作更新
  if(!String(filterindex) && filtervalue) {
    let newfilterindex = newArray.findIndex((item, k) => item === filtervalue);
    operationtype === "add" && newfilterindex > -1 ? newArray.splice(newfilterindex,0,data) : "";
    operationtype === "delete" && newfilterindex > -1 ? newArray.splice(newfilterindex,1) : "";
    operationtype === "update" && newfilterindex > -1 ? newArray.splice(newfilterindex,1,data) : "";
  }
  return newArray;
}
// 数组对象匹配修改，添加，删除，orginArrayObject--筛选的数组
// 对象字段，filterkey--更新的字段条件，filterindex--更新的下标，filtervalue--更新的内容--Number，String，Bool，Date，Array，Object等
// operationtype--"add"，"delete"，"update"，操作类型
const updateArrayObject = (orginArrayObject, options = {filterindex, filterkey, filtervalue, operationtype, data}) => {
  let newArrayObject = JSON.parse(JSON.stringify(orginArrayObject));
  const filterkey = options.filterkey !== undefined ? options.filterkey : "";
  const filterindex = options.filterindex !== undefined ? options.filterindex : "";
  const filtervalue = options.filtervalue !== undefined ? options.filtervalue : "";
  const operationtype = options.operationtype ? options.operationtype : "";
  const data = String(options.data) ? options.data : "";
  // 有下标，优先取下标匹配，操作更新，更新某一组对象
  if (String(filterindex) && !String(filterkey) && !String(filtervalue)) {
    operationtype === "add" ? newArrayObject.splice(filterindex,0,data) : "";
    operationtype === "delete" ? newArrayObject.splice(filterindex,1) : "";
    operationtype === "update" ? newArrayObject.splice(filterindex,1,data) : "";
  }
  // 根据key，value值匹配，操作更新，新增对象属性，修改对象属性，删除对象属性并且新增
  if(!String(filterindex) && filterkey && filtervalue) {
    let newfilterindex = newArrayObject.findIndex((item, k) => item[filterkey] === filtervalue);
    // let filterObjectindex = Object.keys(newArrayObject[newfilterindex]).findIndex((items, j) => items === filtervalue);
    // let filterObjectindex = Object.values(newArrayObject[newfilterindex]).findIndex((items, j) => items === filtervalue);
    // let filterObjectKey = Object.keys(newArrayObject[newfilterindex])[filterObjectindex];
    // operationtype === "add" && newfilterindex > -1 ? newArrayObject[newfilterindex]['gender']='women': "";
    operationtype === "add" ? Object.assign(newArrayObject[newfilterindex], data) : "";
    operationtype === "delete" ? (delete newArrayObject[newfilterindex][filterkey] && Object.assign(newArrayObject[newfilterindex], data)) : "";
    operationtype === "update" && newfilterindex > -1 ? (newArrayObject[newfilterindex][filterkey] = data) : "";
  }
  // 
  return newArrayObject;
}
// 正整数校验
const isPositiveInteger = (value)=> {
  if (/(^[1-9]\d*$)/.test(value)) {
    return true;
  }
  return false;
}
// 非负整数校验
const isNonnegativeInteger = (value)=> {
  if (/^([1-9]\d*|[0]{1,1})$/.test(value)) {
    return true;
  }
  return false;
}
// 有效数字校验
const isSignificantFigures = (value)=> {
  if (/^[0-9]+.?[0-9]*$/.test(value)) {
    return true;
  }
  return false;
}
// 是否超过保留几位小数判断
const isOverFloatNum = (value, num) =>{
  if (value.toString().split(".")[1].length > num) {
    return false;
  }
  return true;
}

module.exports = {
  formatTime: formatTime,
  getQueryString: getQueryString, // 获取链接拼接参数
  interceptString: interceptString, // 字符串截取
  recomBinationString: recomBinationString, // 字符串根据某个字符，分割字符串
  lightCopyArray: lightCopyArray, // 数组浅拷贝
  deepCopyArray: deepCopyArray, // 数组深拷贝
  lightCopyObject: lightCopyObject, // 对象浅拷贝
  deepCopyObject: deepCopyObject, // 对象深拷贝
  ascendingOrderArray: ascendingOrderArray, // 数组升序排序 从小到大
  descendingOrderArray: descendingOrderArray, // 数组降序排序 从大到小
  ascendingOrderArrayObject: ascendingOrderArrayObject, // 数组对象降序排序 从小到大
  descendingOrderArrayObject: descendingOrderArrayObject, // 数组对象降序排序 从大到小
  filterArray: filterArray, // 简单一层数组过滤
  filterArrayObject: filterArrayObject, // 数组对象过滤
  updateArray: updateArray, // 简单一层数组匹配修改，添加，删除
  updateArrayObject: updateArrayObject, // 数组对象匹配修改，添加，删除
  isPositiveInteger: isPositiveInteger, // 正整数校验
  isNonnegativeInteger: isNonnegativeInteger, // 非负整数校验
  isSignificantFigures: isSignificantFigures, // 有效数字校验
  isOverFloatNum: isOverFloatNum, // 是否超过保留几位小数判断
}
