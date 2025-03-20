const RoutesTutorApp = [
/**** Start - Tutor App ****/
  {
    path: '/tutor-app/',
    redirect: '/tutor-app/dashboard',
  },
  {
    path: '/tutor-app/dashboard',
    name: 'Dashboard',
    icon: 'Dashboard',
    access: 'isTutor',
    layout: 'mix',
    component: './tutor-app/dashboard',
  },
  {
    path: '/tutor-app/profile',
    name: 'Profile',
    hideInMenu: true,
    layout: 'mix',
    component: './tutor-app/current-user/profile',
  },
  {
    path: '/tutor-app/students',
    name: 'Students',
    icon: 'TeamOutlined',
    access: 'isTutor',
    layout: 'mix',
  },
  {
    path: '/tutor-app/classes',
    name: 'Classes',
    icon: 'SolutionOutlined',
    access: 'isTutor',
    layout: 'mix',
  },
  {
    path: '/tutor-app/quizzes',
    name: 'Quizzes',
    icon: 'FieldTimeOutlined',
    access: 'isTutor',
    layout: 'mix',
  },
/**** End - Tutor App ****/
];
export default RoutesTutorApp;