const endpoint = 'http://localhost:5000';

export const dofetch = function(url = '/', type = 'GET', data = {}) {
  if (type == 'GET') {
    return fetch(endpoint + url, {
      method: type,
      mode: 'cors',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.text())
      .then(input => JSON.parse(input));
  } else {
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
  }
};
