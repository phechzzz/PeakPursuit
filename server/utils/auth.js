const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

// import decode from 'jwt-decode';

// class AuthService {
//   getProfile() {
//     return decode(this.getToken());
//   }

//   loggedIn() {
//     // Checks if there is a saved token and it's still valid
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }

//   isTokenExpired(token) {
//     try {
//       const decoded = decode(token);
//       if (decoded.exp < Date.now() / 1000) {
//         return true;
//       } else return false;
//     } catch (err) {
//       return false;
//     }
//   }

//   getToken() {
//     // Retrieves the user token from localStorage
//     return localStorage.getItem('id_token');
//   }

//   login(idToken) {
//     // Saves user token to localStorage
//     localStorage.setItem('id_token', idToken);

//     window.location.assign('/');
//   }

//   logout() {
//     // Clear user token and profile data from localStorage
//     localStorage.removeItem('id_token');
//     // this will reload the page and reset the state of the application
//     window.location.assign('/');
//   }
// }

// export default new AuthService();