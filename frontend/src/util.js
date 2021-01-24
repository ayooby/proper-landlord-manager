export function authHeader() {
  let token = localStorage.getItem("token");

  if (token) {
    return { Authorization: "Token " + token };
  } else {
    return {};
  }
}
