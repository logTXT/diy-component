const ELEMENT = document.querySelector('#page');

class BaseRouter {
  constructor(list) {
    this.list = list;
  }

  render(state) {
    let ele = this.list.find(ele => ele.path === state);
    ele = ele ? ele : this.list.find(ele => ele.path === "*");
    ELEMENT.innerHTML = ele.component;
  }

  go(n) {
    window.history.go(n);
  }
}

export class HashRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    window.addEventListener('hashchange', e => this.handler());
  }
  handler() {
    this.render(this.getState());
  }

  getState() {
    const hash = window.location.hash;
    return hash ? hash.slice(1) : '/';
  }

  push(path) {
    window.location.hash = path;
  }

  replace(path) {
    const url = window.location.href.replace(/(?<=#).*/, path);
    window.location.replace(url);
  }
}

export class HistoryRouter extends BaseRouter {
  constructor(list) {
    super(list);
    this.handler();
    window.addEventListener('popstate', e => {
      console.log("popstate active");
      this.handler();
    });
  }

  handler() {
    this.render(this.getState());
  }

  getState() {
    const path = window.location.pathname;
    return path ? path : '/';
  }

  push(path) {
    history.pushState(null, null, path);
    this.handler();
  }

  replace(path) {
    history.replaceState(null, null, path);
    this.handler();
  }
}