import { render } from 'react-dom'
import Animation from './Animation'
import Auth from './Auth'
import Basic from './Basic'
import CustomLink from './CustomLink'
import ModalGallery from './ModalGallery'
import Nesting from './Nesting'
import NoMatch from './NoMatch'
import PreventingTransitions from './PreventingTransitions'
import QueryParams from './QueryParams'
import Recursive from './Recursive'
import RouteConfig from './RouteConfig'
import Sidebar from './Sidebar'
import StaticRouter from './StaticRouter'
import URLParams from './URLParams'

const pages = {
  Animation,
  Auth,
  Basic,
  CustomLink,
  ModalGallery,
  Nesting,
  NoMatch,
  PreventingTransitions,
  QueryParams,
  Recursive,
  RouteConfig,
  Sidebar,
  StaticRouter,
  URLParams
}

const Component = pages[process.env.REACT_APP_PAGE]

render(<Component />, document.getElementById('root'))
