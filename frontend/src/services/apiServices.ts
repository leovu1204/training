import ApiClient from './apiClient';
import UserService from './controllers/user/UserService';
import DataService from './controllers/data/DataService';

export class ApiService {
  public user: UserService;

  public data: DataService;

  constructor() {
    this.user = new UserService(ApiClient);
    this.data = new DataService(ApiClient);
  }
}

const api = new ApiService();

export default api;
