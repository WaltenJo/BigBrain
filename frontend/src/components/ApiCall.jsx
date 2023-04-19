async function apiCall (path, method, payload, success) {
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

  const response = await fetch('http://localhost:5005/' + path, options)
  const data = await response.json();
  if (data.error) {
    alert(data.error);
  } else {
    if (success) {
      return success(data);
    }
  }
}

export default apiCall;
