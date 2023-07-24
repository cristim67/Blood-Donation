import Login from './pages/Login'
import Home from './components/Home'
import Register from './pages/Register'
import Calendar from './pages/Calendar'
import NotFound from './pages/NotFound'

const routes = [
  {
    name: 'Logare',
    path: '/login/:type',
    isPrivate: false,
    Component: Login,
  },
  {
    name: 'Calendar',
    path: '/calendar/:type',
    isPrivate: false,
    Component: Calendar,
  },
  {
    name: 'Acasa',
    path: '/',
    isPrivate: false,
    Component: Home,
  },
  {
    name: 'Inregistrare',
    path: '/inregistrare/:type',
    isPrivate: false,
    Component: Register,
  },
  {
    name: '404',
    path: '*',
    isPrivate: false,
    Component: NotFound,
  },
]

export default routes