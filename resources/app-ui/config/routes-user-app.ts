const RoutesUserApp = [
/**** Start - User App ****/
  {
    path: '/user-app/',
    redirect: '/user-app/dashboard',
  },
  {
    path: '/user-app/dashboard',
    name: 'Dashboard',
    icon: 'Dashboard',
    access: 'isUser',
    layout: 'mix',
    component: './user-app/dashboard',
  },
  {
    path: '/user-app/profile',
    name: 'Profile',
    hideInMenu: true,
    layout: 'mix',
    component: './user-app/current-user/profile',
  },
  {
    path: '/user-app/tutor-hiring',
    name: 'Tutor Hiring',
    icon: 'UsergroupAddOutlined',
    access: 'isUser',
    layout: 'mix',
    component: './user-app/tutor-hiring/list-tutors-hiring',
  },
  {
    path: '/user-app/hired-tutors',
    name: 'Hired Tutors',
    icon: 'TeamOutlined',
    access: 'isUser',
    layout: 'mix',
    component: './user-app/hired-tutors/list-hired-tutors',
  },
  {
    path: '/user-app/classes',
    name: 'Classes',
    icon: 'SolutionOutlined',
    access: 'isUser',
    layout: 'mix',
    component: './user-app/classes/list-classes',
  },
  {
    path: '/user-app/quizzes',
    name: 'Quizzes',
    icon: 'FieldTimeOutlined',
    access: 'isUser',
    layout: 'mix',
    component: './user-app/quizzes/list-quizzes',
  },
  {
    path: '/user-app/fee-vouchers',
    name: 'Fee Vouchers',
    icon: 'FileProtectOutlined',
    access: 'isUser',
    layout: 'mix',
    component: './user-app/fee-vouchers/list-fee-vouchers',
  },
/**** End - User App ****/
];
export default RoutesUserApp;