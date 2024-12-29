const Urls = {
  GET: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://29.javascript.htmlacademy.pro/kekstagram/'
};


const sendRequest = (onSuccess, onError, method, body) =>
  fetch(
    Urls[method], {method: method, body: body},
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(onError);

const getData = (onSuccess, onError, method = 'GET') => sendRequest(onSuccess, onError, method);

const uploadData = (onSuccess, onError, body, method = 'POST') => sendRequest(onSuccess, onError, method, body);

export {getData, uploadData};
