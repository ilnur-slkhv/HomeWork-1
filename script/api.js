const CONFIG_API = {
  // url: "https://my-json-server.typicode.com/maxorel/db/home", //вариант базы данных от Максима
  url: "http://localhost:3001/tasks",
  headers: {
    "Content-type": "application/json",
  },
};

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _onResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject({ ...res, message: "Ошибка на стороне сервера" });
  }

  getAllTasks() {
    return fetch(`${this._url}`, {
      method: "GET",
    }).then(this._onResponse);
  }

  addNewTask(data) {
    return fetch(`${this._url}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: this._headers,
    }).then(this._onResponse);
  }
}

export const api = new Api(CONFIG_API);
