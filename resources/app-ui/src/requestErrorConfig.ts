import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

import { RenameObjectKeys } from '@/components/Helpers/ObjectHelpers';
import {OrderByFromSort, OrderFromSort} from "@/components/Helpers/TableHelpers";

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // // 错误处理： umi@3 的错误处理方案。
  // errorConfig: {
  //   // 错误抛出
  //   errorThrower: (res) => {
  //     console.log('errorConfig');
  //     console.log('errorConfig - res');
  //     console.log(res);
  //     const { success, data, errorCode, errorMessage, showType } =
  //       res as unknown as ResponseStructure;
  //     if (!success) {
  //       const error: any = new Error(errorMessage);
  //       error.name = 'BizError';
  //       error.info = { errorCode, errorMessage, showType, data };
  //       throw error; // 抛出自制的错误
  //     }
  //   },
  //   // 错误接收及处理
  //   errorHandler: (error: any, opts: any) => {
  //     console.log('errorHandler');
  //     console.log('errorHandler - error');
  //     console.log(error);
  //     console.log('errorHandler - opts');
  //     console.log(opts);
  //     if (opts?.skipErrorHandler) throw error;
  //     // 我们的 errorThrower 抛出的错误。
  //     if (error.name === 'BizError') {
  //       const errorInfo: ResponseStructure | undefined = error.info;
  //       if (errorInfo) {
  //         const { errorMessage, errorCode } = errorInfo;
  //         switch (errorInfo.showType) {
  //           case ErrorShowType.SILENT:
  //             // do nothing
  //             break;
  //           case ErrorShowType.WARN_MESSAGE:
  //             message.warning(errorMessage);
  //             break;
  //           case ErrorShowType.ERROR_MESSAGE:
  //             message.error(errorMessage);
  //             break;
  //           case ErrorShowType.NOTIFICATION:
  //             notification.open({
  //               description: errorMessage,
  //               message: errorCode,
  //             });
  //             break;
  //           case ErrorShowType.REDIRECT:
  //             // TODO: redirect
  //             break;
  //           default:
  //             message.error(errorMessage);
  //         }
  //       }
  //     } else if (error.response) {
  //       // Axios 的错误
  //       // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
  //       message.error(`Response status:${error.response.status}`);
  //     } else if (error.request) {
  //       // 请求已经成功发起，但没有收到响应
  //       // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
  //       // 而在node.js中是 http.ClientRequest 的实例
  //       message.error('None response! Please retry.');
  //     } else {
  //       // 发送请求时出了点问题
  //       message.error('Request error, please retry.');
  //     }
  //   },
  // },

  /**
   * https://github.com/umijs/umi-request
   *
   * https://stackoverflow.com/a/51200448
   */
  headers: {
    ...(process.env.NODE_ENV === 'production') && {
      // 'X-WP-Nonce': window?.wp_ech?.api?.nonce
      // 'X-Requested-With': 'XMLHttpRequest',
      // "Content-Type": "multipart/form-data",
      'Authorization': "Bearer " +localStorage.getItem('laravel_api_bearer_token'),
    },
    ...(process.env.NODE_ENV === 'development') && {
      // 'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'application/json',
      // 'Authorization': "Basic " + window.btoa(API_USER_NAME + ':' + API_PASSWORD),
      // "Content-Type": "multipart/form-data",
      'Authorization': "Bearer " +localStorage.getItem('laravel_api_bearer_token'),
    },
    // ...options.headers,
  },

  // timeout: 1000,

  /**
   /* 'credentials' indicates whether the user agent should send cookies from the other domain in the case of cross-origin requests.
   /* omit: Never send or receive cookies.
   /* same-origin: Send user credentials (cookies, basic http auth, etc..) if the URL is on the same origin as the calling script. This is the default value.
   /* include: Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls.
   **/
  // credentials: 'include', // default

  // request interceptor
  requestInterceptors: [
    (config: RequestOptions) => {
      // Intercept request configuration for personalized processing.

      console.log('requestInterceptors');

      console.log('config - before');
      console.log(config);

      console.log('config?.params');
      console.log(config?.params);

      /**
       * Start - Pagination
       */
      const renamed_pagination_params = RenameObjectKeys( config?.params?.pagination, {
        current: 'page', pageSize: 'per_page',
      } );
      console.log('renamed_pagination_params - after');
      console.log(renamed_pagination_params);
      /**
       * End - Pagination
       */


      /**
       * Start - Sorting
       */
      const orderby = OrderByFromSort( config?.params?.sort );
      // console.log('orderby');
      // console.log(orderby);
      const order = OrderFromSort( config?.params?.sort );
      // const order_obg = { orderby: '', order: '' };
      const order_obg = {
        // orderby: 'id',
        // order: 'desc'
        orderby: null,
        order: null
      };
      if( 'undefined' !== typeof orderby && '' !== orderby ){
        order_obg.orderby = orderby;
      }
      if( 'undefined' !== typeof order && '' !== order ){
        order_obg.order = order;
      }
      console.log('order_obg');
      console.log(order_obg);
      /**
       * End - Sorting
       */


      /**
       * Add all chnages to the paramateors orbject of axios (reques) or ahook ( userRequest)
       */
      config.params = {
        ...renamed_pagination_params,
        ...order_obg,
        ...config.params
      };

      // 'credentials' indicates whether the user agent should send cookies from the other domain in the case of cross-origin requests.
      // omit: Never send or receive cookies.
      // same-origin: Send user credentials (cookies, basic http auth, etc..) if the URL is on the same origin as the calling script. This is the default value.
      // include: Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls.
      config.credentials = 'include'; // default

      /**
       * Remove extra properties
       */
      delete config?.params?.pagination;
      delete config?.params?.sort;


      /**
       * This URL Modification is most important for production build else API request will not work in production mode
       */
      const url = SITE_URL+config.url;

      // const config_new = { ...config, headers:{
      //     ...config.headers,
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }  };


      // console.log('config - after');
      // console.log(config);

      // return { ...config, config_new };

      return { ...config, url };
      // return { ...config };

      // return { ...config, url, headers:{
      //   ...config.headers,
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }  };
    },
  ],


  // // 响应拦截器
  // responseInterceptors: [
  //   (response) => {
  //     // 拦截响应数据，进行个性化处理
  //     const { data } = response as unknown as ResponseStructure;
  //
  //     if (data?.success === false) {
  //       message.error('请求失败！');
  //     }
  //     return response;
  //   },
  // ],

  // response interceptor
  responseInterceptors: [
    (response) => {
    // console.log('responseInterceptors - response');
    // console.log(response);
      // console.log(response?.headers);


      /**
       * By Ejaz
       * Most Important to implement the pagination with wp-api on tables etc
       */
      if(response.headers["x-wp-total"]){
        // response?.total = response.headers.'x-wp-total';
        response.total = response.headers["x-wp-total"];
      }

      // Intercept the response data for personalized processing
      const {data} = response as unknown as ResponseStructure;

      if (data?.success === false) {
        message.error('Request failed!');
      }
      return response;
    },
  ],

};
