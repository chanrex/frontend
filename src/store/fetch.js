const endpoint = 'http://localhost:5000';

export const dofetch = function(url = '/', type = 'GET', data = {}) {
  return fetch(endpoint + url, {
    method: type,
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.text())
    .then(input => JSON.parse(input));
};
