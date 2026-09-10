const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return response
    .json()
    .catch(() => ({}))
    .then((data) => Promise.reject(new Error(data.message || `Error: ${response.status}`)));
}

function request(endpoint, options = {}) {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  }).then(checkResponse);
}

export function register(email, password) {
  return request("/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function authorize(email, password) {
  return request("/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function getUserInfo(token) {
  return request("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
