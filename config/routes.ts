export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { component: './404' },
    ],
  },

  { path: '/welcome', name: '主页', icon: 'smile', component: './Welcome' },
  { name: '角色管理', icon: 'user', path: '/users', component: './UserList' },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     { path: '/admin/sub-page', name: '二级管理页', icon: 'smile', component: './Welcome' },
  //     { component: './404' },
  //   ],
  // },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  {
    path: '/finance',
    name: '财务管理',
    icon: 'moneyCollect',
    access: 'canAdmin',
    routes: [
      {
        path: '/finance/revenueStatistics',
        name: '营收统计',
        component: './finance/RevenueStatistics',
      },
      { component: './404' },
    ],
  },
  {
    path: '/miniProgram',
    name: '小程序运营',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/miniProgram/banner',
        name: '首页海报',
        component: './miniProgram/Banner',
      },
      {
        path: '/miniProgram/videoUpload',
        name: '宣传视频',
        component: './miniProgram/VideoUpload',
      },
      {
        path: '/miniProgram/message',
        name: '信息发布',
        component: './miniProgram/Message',
      },

      { component: './404' },
    ],
  },
  {
    path: '/course',
    name: '课程管理',
    icon: 'experiment',
    access: 'canAdmin',
    routes: [
      {
        path: '/course/addCourse',
        name: '添加课程',
        component: './course/AddCourse',
      },
      {
        path: '/course/courseList',
        name: '课程列表',
        component: './course/CourseList',
      },
      {
        path: '/course/courseTag',
        name: '课程分类标签管理',
        component: './course/CourseTag',
      },
      { component: './404' },
    ],
  },
  {
    path: '/customer',
    name: '客户管理',
    icon: 'team',
    access: 'canAdmin',
    routes: [
      {
        path: '/customer/customerList',
        name: '客户列表',
        component: './customer/CustomerList',
      },
      {
        path: '/customer/vip',
        name: '会员管理',
        component: './customer/Vip',
      },
      { component: './404' },
    ],
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'unorderedList',
    access: 'canAdmin',
    routes: [
      {
        path: '/order/backOrder',
        name: '退单处理',
        component: './order/BackOrder',
      },
      {
        path: '/order/orderList',
        name: '课程订单',
        component: './order/OrderList',
      },
      {
        path: '/order/rechargeOrderList',
        name: '充值订单',
        component: './order/RechargeOrderList',
      },
      { component: './404' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { component: './404' },
];
