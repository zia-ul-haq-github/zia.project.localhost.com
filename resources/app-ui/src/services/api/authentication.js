import {request } from '@umijs/max';

/** Register interface POST /api/auth/register */
export async function register(body, options) {
  return request('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Login interface POST /api/login/account */
export async function login(body, options) {
    return request('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

/** Logout interface POST /api/logout/account */
export async function logout(body, options) {
  return request('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


/** Get the current user GET /api/auth/me */
export async function getCurrentUser ( params, options )  {
    return request('/api/auth/me', {
        method: 'GET',
        params: {
            ...params,
        },
        ...(options || {}),
    });
}

