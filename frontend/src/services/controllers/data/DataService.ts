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
      userId?: string | null;
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

  async postCampaignData(
    pageType: string,
    data: {
      title: string;
      content: string;
      link: string;
      image: File;
      image_name: string;
    },
  ) {
    const formData = new FormData();
    formData.append('file', data.image, data.image.name);
    const apiUrl = `${pageType}`;
    try {
      const assetResponse = await this.axios.post('assets', formData);

      const mainData = {
        title: data.title,
        content: data.content,
        link: data.link,
        image: assetResponse.data.filename,
        image_name: assetResponse.data.original_name,
      };

      const response = await this.axios.post(apiUrl, mainData);

      return { assetResponse: assetResponse.data, mainResponse: response.data };
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

  async deleteBoardData(id: string, password: { password: string }) {
    try {
      const response = await this.axios.delete(`free-board/${id}`, { data: password });
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

  async editCampaignData(
    pageType: string,
    data: {
      id: string;
      title: string;
      content: string;
      link: string;
      image: File;
      image_name: string;
    },
  ) {
    const apiUrl = `${pageType}`;
    const formData = new FormData();
    formData.append('file', data.image, data.image.name);

    try {
      const assetResponse = await this.axios.post('assets', formData);

      const mainData = {
        id: data.id,
        title: data.title,
        content: data.content,
        link: data.link,
        image: assetResponse.data.filename,
        image_name: assetResponse.data.original_name,
      };

      const response = await this.axios.put(apiUrl, mainData);

      return { assetResponse: assetResponse.data, mainResponse: response.data };
    } catch (error) {
      console.error('Error putting data: ', error);
      throw error;
    }
  }

  async editdataById(
    pageType: string,
    id: string,
    updatedData: {
      content: string;
      title: string;
      password?: string;
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
