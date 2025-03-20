import {request } from '@umijs/max';

export const getCurrentUser = ( params, options ) => {
  return request('/api/auth/me', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};
