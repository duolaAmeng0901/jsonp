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
    if (typeof value === 'string') {
      url = value;
      return;
    }
    if (typeof value === 'function') {
      callback = value;
      return;
    }
    if (typeof value.$name === 'string') {
      options = value;
      return;
    }
    data = value;
  });

  if (!callback) new Error('there is need a callback in jsonp');

  const str = url.split('?')[0];

  const random = parseInt(Math.random() * 10000);

  options = options || def;
  if (cache[str]) {
    options.$name = cache[str];
  }else{
    options.$name += random;
    window[options.$name] = callback;
    cache[str] = options.$name;  
  }

  url = encodeURI(param(url, data, options));
  
  const script = document.createElement('script');
  script.src = url;
  tag.appendChild(script);

  script.onload = function () {
    setTimeout(() => {
      tag.removeChild(this);
    });
  }

  return;
}

function param(url, data, options) {
  let params = '';

  const keys = Object.keys(data);

  keys.forEach(key => {
    let value = data[key] || '';
    params += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  });

  params += '&' + encodeURIComponent(options.$param) + '=' + encodeURIComponent(options.$name);

  url += ~url.indexOf('?') ? params : `?${params}`;

  return url.replace('?&', '?') && url.replace('&&', '&');
}

let def = {
  $name: 'callback',
  $param: '_jsonp',
};

const tag = document.getElementsByTagName('head')[0];

let cache = {};

export default jsonp;