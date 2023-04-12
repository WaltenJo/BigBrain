export const apiCall = (path, method, payload, success) => {
  const options = {
    method: method,
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(payload)
  }

  if (localStorage.getItem('token')) {
    options.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return fetch('http://localhost:5005/' + path, options)
    .then((response) => {
      return response.json()
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            if (success) {
              return success(data);
            }
          }
        });
    });
}
