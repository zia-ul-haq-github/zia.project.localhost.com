import {Footer, AvatarDropdown, AvatarName} from '@/components';
import {
    TwitterOutlined,
    LinkedinOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    ArrowLeftOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
// import { history, request } from '@umijs/max';
import { history } from '@umijs/max';

import defaultSettings from '../config/defaultSettings';
import {errorConfig} from './requestErrorConfig';
import {getCurrentUser} from '@/services/api/authentication';
import React, {useState} from 'react';
import {ConfigProvider, message} from "antd";
/**
 * Language Translation Fix:
 * https://stackoverflow.com/a/64876216
 * https://ant.design/docs/react/i18n
 */
import enUS from 'antd/lib/locale/en_US';

// import {render} from "@testing-library/react";


const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/authentication';


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
  console.log('getInitialState - called');
    const fetchUserInfo = async () => {

        // const currentUser = await request('/api/auth/me', {
        //     method: 'GET'
        // }).then(async (api_response) => {
        //     console.log('/api/auth/me = api_response');
        //     console.log(api_response);
        // }).catch(function (error) {
        //     console.log(error);
        // });

        try {

          const laravel_api_bearer_token = localStorage.getItem('laravel_api_bearer_token');
          console.log('getInitialState - fetchUserInfo - laravel_api_bearer_token');
          if ( laravel_api_bearer_token !== "" && laravel_api_bearer_token !== null && laravel_api_bearer_token.length > 0 ) {
            // if( process.env.NODE_ENV === 'development' ){
            const currentUser = await getCurrentUser({
              // skipErrorHandler: true,
              // context: 'edit',
            });
            
            // const currentUser = request('/api/auth/me', {
            //   method: 'GET'
            // });
            
            console.log('getInitialState - fetchUserInfo - currentUser');
            console.log(currentUser);
            return currentUser?.data;
            // }
          }

        } catch (error) {
            console.log('fetchUserInfo - error');
            console.log(error);
            // history.push(loginPath);
        }
        return undefined;
    };

    const current_user = await fetchUserInfo();


  const {location, action} = history;

    return {
        isDev: process.env.NODE_ENV === 'development',
        location: location,
        // layout_type: ( location?.pathname.includes('app') ) ? 'app' : 'site',
        currentUser: current_user,
        isAdministrator: ( current_user?.role === 'admin' ),
        isUser: ( current_user?.role === 'user' ),
        isTutor: ( current_user?.role === 'tutor' ),
        settings: defaultSettings,
    }

}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({initialState, setInitialState}) => {

  console.log('layout - fn');
  console.log('initialState');
  console.log(initialState);

  console.log('layout - defaultSettings');
  console.log(defaultSettings);

  // const {location, action} = history;
  // console.log('history - location');
  // console.log(location);
  // console.log('history - action');
  // console.log(action);

  let layout_type =  ( location?.pathname.includes('-app') ) ? 'app' : 'site';
  console.log('history - layout_type');
  console.log(layout_type);

    const site_layout = {
        avatarProps: {
          src: ( initialState?.currentUser?.image_url != null ) ? initialState?.currentUser?.image_url : 'https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png',
          // src: initialState?.currentUser?.image_url,
          // title: <AvatarName/>,
          render: (_, avatarChildren) => {
            return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
          },
        },
        headerTheme: 'light',
        waterMarkProps: {
          content: 'vu - project - site',
        },
        menuDataRender: ( MenuDataItems ) => {
          console.log('menuDataRender');
          console.log('MenuDataItems');
          console.log(MenuDataItems);

            return MenuDataItems.map((MenuDataItem) => {
                console.log('MenuDataItem');
                console.log(MenuDataItem);
                return ( (MenuDataItem.layout === 'top') ? MenuDataItem : false);
            });
        },
      //   onPageChange: () => {
      //     console.log('onPageChange - triggered');
      //     const {location} = history;
      //     console.log('location.pathname');
      //     console.log(location.pathname);
      //     // If not logged in, redirect to login test
      //     // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //     //     history.push(loginPath);
      //     //     history.replace(loginPath);
      //     // }

      //     if( location.pathname == '/authentication' && !initialState?.currentUser ){
      //       console.log('initialState?.currentUser');
      //       console.log(initialState?.currentUser);
      //       // history.push('/'+initialState?.currentUser?.role+'-app/profile');
      //     }
      // },
        childrenRender: (children) => {
          return (
              <ConfigProvider
                prefixCls='vu-project' 
                locale={enUS}
                theme={{
                  components: {
                    Result: {
                      titleFontSize: 30,
                      subtitleFontSize: 26
                    },
                  },
                }}
              >
                {children}
              </ConfigProvider>
          );
        },
        ...initialState?.settings,
        layout: 'top',
      };

     const app_layout = {
         actionsRender:  () => {[]},
        avatarProps: {
          src: ( initialState?.currentUser?.image_url != null ) ? initialState?.currentUser?.image_url : 'https://static-00.iconduck.com/assets.00/profile-user-icon-512x512-nm62qfu0.png',
            // title: <AvatarName/>,
            render: (_, avatarChildren) => {
                return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
            },
        },
       headerTheme: 'light',
        waterMarkProps: {
            content: 'bc200403200 (Zia Ul Haq)',
        },
        footerRender: () => <Footer/>,
         // menuHeaderRender: undefined,
       menuDataRender: ( MenuDataItems ) => {
          console.log('menuDataRender');
          console.log('MenuDataItems');
          console.log(MenuDataItems);

           return MenuDataItems.map((MenuDataItem) => {
                 console.log('MenuDataItem');
                 console.log(MenuDataItem);
               return ( (MenuDataItem.layout === 'mix') ? MenuDataItem : false);
           });

       },
        onPageChange: () => {
            console.log('onPageChange - triggered');
            const {location} = history;
            console.log('location.pathname');
            console.log(location.pathname);
            // If not logged in, redirect to login test
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
                history.replace(loginPath);
            }
        },
        links: [
            <a key="back-to-site" href={SITE_URL} target="_blank" rel="noopener noreferrer" style={{fontWeight: 600, fontSize: "20px"}}>
                <ArrowLeftOutlined style={{color: "#ffc010", fontWeight: 600, fontSize: "20px"}} />
                <span>Back to site</span>
            </a>,
            <a key="produced-by-ziaulhaq" rel="noopener noreferrer">
                <GlobalOutlined />
                <span>Produced By Zia Ul Haq</span>
            </a>,
        ],
        childrenRender: (children) => {
            return (
                    <ConfigProvider 
                      prefixCls='vu-project' 
                      locale={enUS}>
                        {children}
                    </ConfigProvider>
            );
        },

         fixSiderbar: true,
         // splitMenus: true,

        ...initialState?.settings,
        layout: 'mix',
     };


  console.log('layout - app_layout');
  console.log(app_layout);

  console.log('layout - site_layout');
  console.log(site_layout);

    console.log('layout_type');
    console.log(layout_type);

     return ( layout_type === 'app' ) ? app_layout : site_layout ;

  // return app_layout ;

};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
    ...errorConfig,
    // ...options,
    // requestType: 'json'
    // headers:{
    //   ...errorConfig.headers,
    //   'Content-Type': 'application/json;charset=utf-8',
    //   // 'requestType': 'json', // default
    // }
};
