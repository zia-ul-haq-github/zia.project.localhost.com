import { Settings as LayoutSettings } from '@ant-design/pro-components';
import { getCurrentUser as queryCurrentUser } from '@/services/wp-api/user';
import defaultSettings from '../config/defaultSettings';
import { history, Link } from '@umijs/max';
import React, {useState} from 'react';

const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(){

  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      console.log('fetchUserInfo - error');
      console.log(error);
    }
    return undefined;
  };

  // If it is not a login page, execute
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      loading: true,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
  
}

export const LayoutInitialState = () => {
  const [initialState, setInitialState] = useState();
};
