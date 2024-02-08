import decode from 'jwt-decode';

class AuthService {
  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Saves user token to localStorage and redirects to home
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Clears user token from localStorage and redirects to home
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }

  // Checks if the user is currently logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Decodes and returns the profile information from the token
  getProfile() {
    return decode(this.getToken());
  }

 // Checks if a token is expired
isTokenExpired(token) {
  try {
    const decoded = decode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    // Log the error
    console.error("Error decoding token in isTokenExpired:", err.message);
    return true; // Assume the token is expired if it cannot be decoded
  }
}

  // Optionally, a method to update the token stored in localStorage
  updateToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }
}

export default new AuthService();
