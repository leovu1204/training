import { AxiosInstance } from 'axios';

export default class UserService {
  constructor(private axios: AxiosInstance) {}

  getUserDetail = async () => {
    const { data } = await this.axios.get('user/me');

    return data;
  };

  login = async (username: string, password: string) => {
    const response = await this.axios.post('user/login', {
      username,
      password,
    });
    return response.data.user;
  };

  labRegister = async (email: string, fullname: string, password: string, phoneNumber: string, username: string) => {
    const response = await this.axios.post('user/register', {
      email,
      full_name: fullname,
      password,
      username,
      phone_number: phoneNumber,
    });
    return response.data.user;
  };

  async boardLogin(id: string, password: string) {
    try {
      const response = await this.axios.post(`free-board/${id}`, { password });
      return response;
    } catch (error) {
      console.error('Error during board login: ', error);
      throw error;
    }
  }
}
