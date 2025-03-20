import {defineConfig} from '@umijs/max';
import {join} from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import moment from 'moment';

const {REACT_APP_ENV = 'dev'} = process.env;

const build_type = 'local'; // local, staging, live
let create_zip = 'yes'; // yes, no

const sites = [
  {
    type: 'local', url: 'http://zia.project.localhost.com'
  },
  {
    type: 'staging', url: 'https://zia.project.wpvisions.com'
  },
  {
    type: 'live', url: 'https://zia.project.localhost.com'
  }
];


const FileManagerWebpackPlugin = require('filemanager-webpack-plugin');
const DevelopmentZipVersionFolder = '../../../zia-project-development-latest-version/zia.project.localhost.com';
const DevelopmentZipFileSource = '../../../zia-project-development-latest-version';
const ProductionZipVersionFolder = '../../../zia-project-production-latest-version/zia.project.localhost.com';
const ProductionZipFileSource = '../../../zia-project-production-latest-version';

export default defineConfig({

  favicons: [
    '/zia-project-favicon.png',
  ],

  /**
   * https://umijs.org/docs/api/config#history
   */
  history: {type: 'browser'}, // default type is browser // hash

  /**
   * https://umijs.org/docs/api/config#base
   */
  base: '/',
  /**
   * https://umijs.org/docs/api/config#outputpath
   */
  outputPath: '../../public/umi-dist',
  /**
   * https://umijs.org/docs/api/config#publicpath
   */
  publicPath: '/umi-dist/',

  define: {
    
    SITE_URL: sites[sites.map(site => site.type).indexOf(build_type)].url,

    API_URL: sites[sites.map(site => site.type).indexOf(build_type)].url+'/api',

    DEFAULT_USER_PROFILE_IMAGE_URL: sites[sites.map(site => site.type).indexOf(build_type)].url+'/images/default/user-profile-image.png',
    DEFAULT_PLACEHOLDER_IMAGE_URL: sites[sites.map(site => site.type).indexOf(build_type)].url+'/images/default/placeholder.jpg',

    API_USER_NAME: 'admin',
    API_PASSWORD: 'uqT1 P8Cb KtzM Z1VL xMla ccNt',

    isDev: process.env.NODE_ENV === 'development',

  },

  /**
   * https://umijs.org/docs/api/config#chainwebpack
   */
  chainWebpack ( config , { env , webpack } ) {
    if( process.env.NODE_ENV === 'production' && create_zip === 'yes' ){
      config.plugin('filemanager-webpack-plugin').use(FileManagerWebpackPlugin, [
        {
          events:{
            onStart:{
              delete: [
                {
                  source: DevelopmentZipVersionFolder,
                  options: {
                    force: true,
                  },
                },
                {
                  source: DevelopmentZipVersionFolder+'.zip',
                  options: {
                    force: true,
                  },
                },
                // {
                //   source: ProductionZipVersionFolder,
                //   options: {
                //     force: true,
                //   },
                // },
                // {
                //   source: ProductionZipVersionFolder+'.zip',
                //   options: {
                //     force: true,
                //   },
                // }
              ],
            },
            onEnd:{
              mkdir: [ProductionZipVersionFolder, DevelopmentZipVersionFolder],
              copy:[
                /**
                 * Start - Development Version
                 */
                /**
                 * Files From Frontend App
                 */
                { source: './config', destination: DevelopmentZipVersionFolder+'/resources/app-ui/config' },
                // { source: './dist', destination: DevelopmentZipVersionFolder+'/resources/app-ui/dist' },
                { source: './mock', destination: DevelopmentZipVersionFolder+'/resources/app-ui/mock' },
                { source: './public', destination: DevelopmentZipVersionFolder+'/resources/app-ui/public' },
                { source: './src', destination: DevelopmentZipVersionFolder+'/resources/app-ui/src' },
                { source: './tests', destination: DevelopmentZipVersionFolder+'/resources/app-ui/tests' },
                { source: './types', destination: DevelopmentZipVersionFolder+'/resources/app-ui/types' },
                { source: './.editorconfig', destination: DevelopmentZipVersionFolder+'/resources/app-ui/.editorconfig' },
                { source: './.env', destination: DevelopmentZipVersionFolder+'/resources/app-ui/.env' },
                { source: './.eslintignore', destination: DevelopmentZipVersionFolder+'/resources/app-ui/.eslintignore' },
                { source: './.eslintrc.js', destination: DevelopmentZipVersionFolder+'/resources/app-ui/.eslintrc.js' },
                { source: './.gitignore', destination: DevelopmentZipVersionFolder+'/resources/app-ui/.gitignore' },
                { source: './.prettierignore', destination: DevelopmentZipVersionFolder+'/resources/app-ui/.prettierignore' },
                { source: './.prettierrc.js', destination: DevelopmentZipVersionFolder+'/resources/app-ui/.prettierrc.js' },
                { source: './jest.config.ts', destination: DevelopmentZipVersionFolder+'/resources/app-ui/jest.config.ts' },
                { source: './jsconfig.json', destination: DevelopmentZipVersionFolder+'/resources/app-ui/jsconfig.json' },
                { source: './package.json', destination: DevelopmentZipVersionFolder+'/resources/app-ui/package.json' },
                { source: './README.md', destination: DevelopmentZipVersionFolder+'/resources/app-ui/README.md' },
                { source: './tsconfig.json', destination: DevelopmentZipVersionFolder+'/resources/app-ui/tsconfig.json' },
                /**
                 * Files From Outside Of Frontend App
                 */

                /**
                 * Files From Outside Of Frontend App
                 */
                { source: '../../.editorconfig', destination: DevelopmentZipVersionFolder+'/.editorconfig' },
                { source: '../../.env', destination: DevelopmentZipVersionFolder+'/.env' },
                { source: '../../.env.example', destination: DevelopmentZipVersionFolder+'/.env.example' },
                { source: '../../.gitattributes', destination: DevelopmentZipVersionFolder+'/.gitattributes' },
                { source: '../../.gitignore', destination: DevelopmentZipVersionFolder+'/.gitignore' },
                // { source: '../../.styleci.yml', destination: DevelopmentZipVersionFolder+'/.styleci.yml' },
                { source: '../../artisan', destination: DevelopmentZipVersionFolder+'/artisan' },
                { source: '../../composer.json', destination: DevelopmentZipVersionFolder+'/composer.json' },
                // { source: '../../docker-compose.yml', destination: DevelopmentZipVersionFolder+'/docker-compose.yml' },
                { source: '../../package.json', destination: DevelopmentZipVersionFolder+'/package.json' },
                { source: '../../phpunit.xml', destination: DevelopmentZipVersionFolder+'/phpunit.xml' },
                { source: '../../postcss.config.js', destination: DevelopmentZipVersionFolder+'/postcss.config.js' },
                { source: '../../README.md', destination: DevelopmentZipVersionFolder+'/README.md' },
                { source: '../../tailwind.config.js', destination: DevelopmentZipVersionFolder+'/tailwind.config.js' },
                { source: '../../vite.config.js', destination: DevelopmentZipVersionFolder+'/vite.config.js' },
                // { source: '../../server.php', destination: DevelopmentZipVersionFolder+'/server.php' },
                // { source: '../../webpack.mix.js', destination: DevelopmentZipVersionFolder+'/webpack.mix.js' },
                { source: '../../app', destination: DevelopmentZipVersionFolder+'/app' },
                { source: '../../bootstrap', destination: DevelopmentZipVersionFolder+'/bootstrap' },
                { source: '../../config', destination: DevelopmentZipVersionFolder+'/config' },
                { source: '../../database', destination: DevelopmentZipVersionFolder+'/database' },
                { source: '../../public', destination: DevelopmentZipVersionFolder+'/public' },
                { source: '../../routes', destination: DevelopmentZipVersionFolder+'/routes' },
                { source: '../../storage', destination: DevelopmentZipVersionFolder+'/storage' },
                { source: '../../tests', destination: DevelopmentZipVersionFolder+'/tests' },
                // { source: '../../vu-documents', destination: DevelopmentZipVersionFolder+'/vu-documents' },
                { source: '../../resources/css', destination: DevelopmentZipVersionFolder+'/resources/css' },
                { source: '../../resources/js', destination: DevelopmentZipVersionFolder+'/resources/js' },
                // { source: '../../resources/lang', destination: DevelopmentZipVersionFolder+'/resources/lang' },
                { source: '../../resources/views', destination: DevelopmentZipVersionFolder+'/resources/views' },

                /**
                 * End - Development Version
                 */

                /**
                 * Start - Production Version
                 */
                /**
                 * Files From Frontend App
                 */
                // { source: './dist', destination: ProductionZipVersionFolder+'/resources/app-ui/dist' },
                // { source: './public', destination: ProductionZipVersionFolder+'/resources/app-ui/public' },
                /**
                 * Files From Outside Of Frontend App
                 */
                // { source: '../css', destination: ProductionZipVersionFolder+'/assets/frontend/css' },
                // { source: '../js', destination: ProductionZipVersionFolder+'/assets/frontend/js' },
                // { source: '../../backend', destination: ProductionZipVersionFolder+'/assets/backend' },
                // { source: '../../images', destination: ProductionZipVersionFolder+'/assets/images' },
                // { source: '../../../includes', destination: ProductionZipVersionFolder+'/includes' },
                // { source: '../../../templates', destination: ProductionZipVersionFolder+'/templates' },
                // { source: '../../../composer.json', destination: ProductionZipVersionFolder+'/composer.json' },
                // { source: '../../../ecarehub.php', destination: ProductionZipVersionFolder+'/ecarehub.php' },
                /**
                 * Start - Production Version
                 */
              ],
              archive:[
                {
                  source: DevelopmentZipFileSource,
                  destination: DevelopmentZipVersionFolder+'.zip',
                  options: {
                    globOptions: {
                      // https://github.com/Yqnn/node-readdir-glob#options
                      dot: true,
                    },
                  },
                },
                // {
                //   source: ProductionZipFileSource,
                //   destination: ProductionZipVersionFolder+'.zip',
                //   options: {
                //     globOptions: {
                //       // https://github.com/Yqnn/node-readdir-glob#options
                //       dot: true,
                //     },
                //   },
                // }
              ]
            }
          }
        }
      ]);
    }
    // );
  },


  /**
   * https://umijs.org/docs/api/config#codesplitting
   */

  /**
   * @name 开启 hash 模式
   * @description 让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: false,

  /**
   * @name 兼容性设置
   * @description 设置 ie11 不一定完美兼容，需要检查自己使用的所有依赖
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name 路由的配置，不在路由中引入的文件不会编译
   * @description 只支持 path，component，routes，redirect，wrappers，title 的配置
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name 主题的配置
   * @description 虽然叫主题，但是其实只是 less 的变量设置
   * @doc antd的主题设置 https://ant.design/docs/react/customize-theme-cn
   * @doc umi 的theme 配置 https://umijs.org/docs/api/config#theme
   */
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    'root-entry-name': 'variable',
  },
  /**
   * @name moment 的国际化配置
   * @description 如果对国际化没有要求，打开之后能减少js的包大小
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name 代理配置
   * @description 可以让你的本地服务器代理到你的服务器上，这样你就可以访问服务器的数据了
   * @see 要注意以下 代理只能在本地开发时使用，build 之后就无法使用了。
   * @doc 代理介绍 https://umijs.org/docs/guides/proxy
   * @doc 代理配置 https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,
  //============== 以下都是max的插件配置 ===============
  /**
   * @name 数据流插件
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * 一个全局的初始数据流，可以用它在插件之间共享数据
   * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name layout 插件
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'VU Project',
  layout: {
    locale: false,
    // locale: true,
    // locale: {
    //     // antd : true , // If `antd` is included in the project dependencies, the default is true
    //   enable: false,
    //   default: 'en_US',
    //   // baseNavigator: true,
    // },
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs 插件
   * @description 将项目中的 moment 替换为 dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name 国际化插件
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    // baseNavigator: true,
  },
  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name 网络请求配置
   * @description 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {
    // dataField: 'data',
    /**
     * We have make it blank because
     */
    dataField: '',
  },
  /**
   * @name 权限插件
   * @description 基于 initialState 的权限插件，必须先打开 initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name <head> 中额外的 script
   * @description 配置 <head> 中额外的 script
   */
  headScripts: [
    // 解决首次加载时白屏的问题
    {src: '/static-assets/scripts/loading.js', async: true},
  ],

  /**
   * https://umijs.org/docs/api/config#copy
   */
  // copy: [
  //   {from: 'src/static-assets/scripts', to: 'dist/scripts'},
  //   {from: 'src/static-assets/images', to: 'dist/images'},
  // ],

  //================ pro 插件配置 =================
  presets: ['umi-presets-pro'],
  /**
   * @name openAPI 插件的配置
   * @description 基于 openapi 的规范生成serve 和mock，能减少很多样板代码
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  // openAPI: [
  //   {
  //     requestLibPath: "import { request } from '@umijs/max'",
  //     // 或者使用在线的版本
  //     // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
  //     schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //     projectName: 'wp-api',
  //   },
  //   // {
  //   //   requestLibPath: "import { request } from '@umijs/max'",
  //   //   schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //   //   projectName: 'swagger',
  //   // },
  // ],
  mfsu: {
    strategy: 'normal',
  },
  requestRecord: {},
  esbuildMinifyIIFE: true
});
