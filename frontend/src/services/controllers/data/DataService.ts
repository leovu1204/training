import { AxiosInstance } from 'axios';

export default class DataService {
  constructor(private axios: AxiosInstance) {}

  async fetchDataList(
    pageType: string,
    searchOptions: {
      searchBy: string;
      searchValue: string;
      page: number;
      pageSize: number;
      userId?: string;
    },
  ) {
    const apiSearchParams = {
      search_by: searchOptions.searchBy,
      search_value: searchOptions.searchValue,
      page: searchOptions.page,
      page_size: searchOptions.pageSize,
      user_id: searchOptions.userId,
    };

    const apiUrl = `${pageType}`;

    try {
      const response = await this.axios.get(apiUrl, { params: apiSearchParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  }

  async fetchDataById(pageType: string, itemId: string) {
    const apiUrl = `${pageType}/${itemId}`;

    try {
      const response = await this.axios.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching data by ID: ', error);
      throw error;
    }
  }

  async postAssets(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = `assets`;
    try {
      const response = await this.axios.post(apiUrl, formData);
      return response.data;
    } catch (error) {
      console.error('Error posting data: ', error);
      throw error;
    }
  }

  async postData(
    pageType: string,
    data: {
      any: [];
    },
  ) {
    const apiUrl = `${pageType}`;
    try {
      const response = await this.axios.post(apiUrl, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data: ', error);
      throw error;
    }
  }

  async deleteData(pageType: string, ids: string[]) {
    const apiUrl = `${pageType}`;
    try {
      const response = await this.axios.delete(apiUrl, { data: { ids } });
      return response.data;
    } catch (error) {
      console.error('Error deleting data: ', error);
      throw error;
    }
  }

  async deleteDataById(pageType: string, id: string) {
    const apiUrl = `${pageType}/${id}`;
    try {
      const response = await this.axios.delete(apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error deleting data: ', error);
      throw error;
    }
  }

  async editData(
    pageType: string,
    updatedData: {
      any: [];
    },
  ) {
    const apiUrl = `${pageType}`;
    try {
      const response = await this.axios.put(apiUrl, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error editing data: ', error);
      throw error;
    }
  }

  async editAdminData(
    pageType: string,
    id: string,
    updatedData: {
      title?: string;
      content?: string;
    },
  ) {
    const apiUrl = `${pageType}/${id}`;
    try {
      const response = await this.axios.put(apiUrl, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error editing data: ', error);
      throw error;
    }
  }
}
