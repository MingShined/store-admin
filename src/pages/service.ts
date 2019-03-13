import { httpGet, httpPost, httpPut, httpDelete } from 'src/utils/request';

const IndexService = {
  async uploadBanner(data) {
    const url = 'api/banner';
    return httpPost(url, data);
  },
  async getBanner() {
    const url = 'api/banner';
    return httpGet(url);
  },
  async createSort(data) {
    const url = '/api/sort';
    return httpPost(url, data);
  },
  async querySort() {
    const url = '/api/sort';
    return httpGet(url);
  },
  async findSort(id) {
    const url = `/api/sort/${id}`;
    return httpGet(url);
  },
  async updateSort(data) {
    const url = `/api/sort`;
    return httpPut(url, data);
  },
  async deleteSort(id) {
    const url = `/api/sort/${id}`;
    return httpDelete(url);
  },
  async createGood(data) {
    const url = '/api/good';
    return httpPost(url, data);
  },
  async queryGood(params) {
    const url = '/api/good';
    return httpGet(url, params);
  },
  async findGood(id) {
    const url = `/api/good/${id}`;
    return httpGet(url);
  },
  async updateGood(data) {
    const url = '/api/good';
    return httpPut(url, data);
  },
  async deleteGood(id) {
    const url = `/api/good/${id}`;
    return httpDelete(url);
  },
  async queryCustomer() {
    const url = `/api/user`;
    return httpGet(url);
  },
  async queryOrder() {
    const url = `/api/all-order`;
    return httpGet(url);
  },
  async consignmentGood(data) {
    const url = `/api/order`;
    return httpPut(url, data);
  },
  async sendMessage(payload) {
    const url = `http://112.74.76.186:8030/service/httpService/httpInterface.do`;
    const data = {
      username: 'JSM42615',
      password: 'd83bgb8a',
      veryCode: 'ce5hzofbklen',
      content: `@1@=${payload.realName}`,
      method: 'sendMsg',
      msgtype: 2,
      tempid: 'JSM42615',
      code: 'utf-8',
      mobile: payload.mobile
    };
    return httpPost(url, data);
  }
};

export default IndexService;
