import { createRouter, createWebHistory } from 'vue-router';

//引入组件
const Home = () => import( '../views/Home.vue');
const About = () => import( '../views/About.vue');
const Login = () => import( '../components/Login.vue');
const Register = () => import( '../components/Register.vue');
const HomePage = () => import( '../views/HomePage.vue')
const MyAccount = () => import( '../components/MyAccount.vue')
const MyAdminOrders = () => import( '../components/MyAdminOrders.vue')
const MyHexiaoOrders = () => import( '../components/MyHexiaoOrders.vue')
const MyInfo = () => import( '../components/MyInfo.vue' )
const MaterialManagement = () => import( '../components/MaterialManagement.vue')
const MemberManagement = () => import( '../components/MemberManagement.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path:'login',
        component:Login
      },
      {
        path:'/register',
        component:Register
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path:'/register',
    name:'Register',
    component:Register
  },
  {
    path:'/homepage',
    name:'HomePage',
    component:HomePage,
    children:[
      {
        path:'/homepage/my-account',
        component:MyAccount
      },
      {
        path:'/homepage/my-admin-orders',
        component:MyAdminOrders
      },
      {
        path:'/homepage/my-hexiao-orders',
        component:MyHexiaoOrders,
      },
      {
        path:'/homepage/material-management',
        component:MaterialManagement
      },
      {
        path:'/homepage/member-management',
        component:MemberManagement
      },
      {
        path:'/homepage/my-info',
        component:MyInfo
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
