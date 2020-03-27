import { HashRouter,HistoryRouter } from './router.js';
import { routerList } from './routerList.js';
const mode = 'history';
class WebRouter {
  constructor({ mode = 'hash', routeList }) {
    this.router = mode === 'hash'
      ? new HashRouter(routeList)
      : new HistoryRouter(routeList);
  }
  push(path) {
    this.router.push(path);
  }
  replace(path) {
    this.router.replace(path);
  }
  go(num) {
    this.router.go(num);
  }
}

const router = new WebRouter({
  mode,
  routeList: routerList
});

document.querySelector('.btn-list').addEventListener('click', e => {
  const event = e || window.event;
  if (event.target.tagName === 'LI') {
    const param = event.target.dataset.url;
    param.includes('/') ? router.push(param) : router.go(param);
  }
});

document.querySelector('.replace-btn').addEventListener('click', e => {
  router.replace('/');
});