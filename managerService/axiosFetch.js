import axios from "axios";

class AxiosFetch {
  // Method for making GET requests
  get(url, data = {}, headers = {}) {
    return axios.get(url, data, headers); // Return axios GET request
  }

  // Method for making POST requests
  post(url, data = {}, headers = {}) {
    return axios.post(url, data, headers); // Return axios POST request
  }

  // Method for making PUT requests
  put(url, data = {}, headers = {}) {
    return axios.put(url, data, headers); // Return axios PUT request
  }

  // Method for making DELETE requests
  delete(url, headers = {}) {
    return axios.delete(url, headers); // Return axios DELETE request
  }
}

export default AxiosFetch;
