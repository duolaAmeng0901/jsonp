/**
 * @param {string} url
 * @param {object} data
 * @param {object} options
 *
 * options
 *   $name: the name of callback, default callback
 *   $param: the jsonp key, default _jsonp
 *
 * @param {function} callback
 * **/


function jsonp(url, data, options, callback) {

  Array.prototype.forEach.call(arguments, value => {
    if(typeof value === 'string'){
      url = value;
      return;
    }
    if(typeof value === 'function'){
      callback = value;
      return;
    }
    if(typeof value.$name === 'string'){
      options = value;
      return;
    }
    data = value;
  });

  const random = parseInt(Math.random * 10000);

  options = options || def;
  options.$name += random;

  callback = callback || fn;

  url = encodeURI(param(url, data, options));



}

function param(url, data, options) {
  let params = '';

  const keys = Object.keys(data);

  keys.forEach(key => {
    let value = data[key] || '';
    params += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  });

  params +=  '&' + encodeURIComponent(options.$param) + '=' + encodeURIComponent(options.$name);

  url += ~url.indexOf('?') ? params : `?${params}`;

  return url.replace('?&', '?') && url.replace('&&', '&');
}


function fn(err, data) {

}


let def = {
  $name: 'callback',
  $param: '_jsonp',
};















export default jsonp