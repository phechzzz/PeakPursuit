const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// Assuming SECRET is defined in your environment variables
const secret = process.env.SECRET;
const expiration = '1h';

module.exports = {
  authMiddleware: function ({ req }) {
    // Token can be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Extract token if it's sent as "Bearer <tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // Proceed without user data if no token is found
    if (!token) {
      return req;
    }

    // Verify token and attach user data to request
    try {
      // Note: jwt.verify does not support a 'maxAge' option. 'expiresIn' is used at the time of signing.
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch (error) {
      // Log the error internally but do not send error details to client to avoid leaking security details
      console.error('Authentication token is invalid:', error.message);
      // Optionally attach error details in development mode
      if (process.env.NODE_ENV === 'development') {
        req.authError = error.message;
      }
    }

    return req;
  },

  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };

    // Sign and return the token with user data
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  // Create a standardized GraphQL error for authentication issues
  authenticationError: function(message = 'Could not authenticate user.') {
    return new GraphQLError(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  },
};
