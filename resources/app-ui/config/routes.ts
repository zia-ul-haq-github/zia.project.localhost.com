/**
  * @name umi routing configuration for
  * @description routing configuration for
  * @param path path only supports two placeholder configurations, the first is in the form of dynamic parameter :id, and the second is * wildcard, which can only appear at the end of the routing string.
  * @param component configures the React component path used for rendering after location and path match. It can be an absolute path or a relative path. If it is a relative path, it will be searched starting from src/pages.
  * @param routes Configure sub-routes, usually used when you need to add layout components to multiple paths.
  * @param redirect configure route jump
  * @param wrappers Configure the packaging component of the routing component. Through the packaging component, you can combine more functions into the current routing component. For example, it can be used for routing-level permission verification.
  * @param name Configure the title of the route. By default, the value of menu.xxxx in the internationalization file menu.ts is read. If the name is configured as login, the value of menu.login in menu.ts is read as the title.
  * @param icon Configure the icon of the route. For the value, please refer to https://ant.design/components/icon-cn. Pay attention to removing the style suffix and capitalization. If you want to configure the icon as <StepBackwardOutlined />, the value should be stepBackward. or StepBackward, if you want to configure the icon as <UserOutlined />, the value should be user or User
  * @doc https://umijs.org/docs/guides/routes
  */

import RoutesAdminApp from './routes-admin-app';
import RoutesTutorApp from './routes-tutor-app';
import RoutesUserApp from './routes-user-app';

export default [

  /**** Start - Site ****/
  {
    path: '/authentication',
    name: 'Signup / Login',
    hideInMenu: true,
    icon: 'LockOutlined',
    layout: 'mix',
    component: './authentication',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
  /**** End - Site ****/

  ...RoutesAdminApp,
  ...RoutesTutorApp,
  ...RoutesUserApp,

];