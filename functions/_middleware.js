/**
 * Cloudflare Pages Basic Authentication Middleware
 *
 * This middleware protects staging/preview sites with Basic Authentication.
 * Update BASIC_USER and BASIC_PASS for production use.
 */

const BASIC_USER = 'test';
const BASIC_PASS = 'test';

/**
 * Parse Basic Auth header
 * @param {string} authHeader - Authorization header value
 * @returns {{user: string, pass: string}|null}
 */
function parseBasicAuth(authHeader) {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null;
  }

  try {
    const base64Credentials = authHeader.substring(6);
    const credentials = atob(base64Credentials);
    const [user, pass] = credentials.split(':');
    return { user, pass };
  } catch (error) {
    return null;
  }
}

/**
 * Verify credentials
 * @param {string} user
 * @param {string} pass
 * @returns {boolean}
 */
function verifyCredentials(user, pass) {
  return user === BASIC_USER && pass === BASIC_PASS;
}

/**
 * Create unauthorized response
 * @returns {Response}
 */
function unauthorizedResponse() {
  return new Response('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

/**
 * Middleware handler
 * @param {Request} request
 * @param {Function} next
 * @returns {Promise<Response>}
 */
export async function onRequest({ request, next }) {
  // Skip authentication for assets
  const url = new URL(request.url);
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf)$/)
  ) {
    return next();
  }

  // Parse authorization header
  const authHeader = request.headers.get('Authorization');
  const credentials = parseBasicAuth(authHeader);

  // Verify credentials
  if (!credentials || !verifyCredentials(credentials.user, credentials.pass)) {
    return unauthorizedResponse();
  }

  // Continue to next middleware/page
  return next();
}
