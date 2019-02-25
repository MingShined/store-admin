import { httpPost } from '../utils/request';

interface FileUploadOption {
  url?: string;
  data: any;
  headers?: any;
}

const CommonService = {
  fileUpload({
    url = '/api/upload',
    data = {},
    headers = { 'Content-Type': 'application/image' }
  }: FileUploadOption) {
    const form = new FormData();
    Object.keys(data).map(key => {
      form.append(key, data[key]);
    });
    return httpPost(url, form);
  }
};
export default CommonService;
