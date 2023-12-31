import axios from 'axios';
import localStorage from './localStorage';


// later check login from the token in local storage
const baseUrl = process.env.REACT_APP_BACKEND_URL

const getRequest = async (link, tokenRequired = false) => {
    try {
        const finalUrl = `${baseUrl}/${link}`
        let config = {};
        if (tokenRequired) {
            const token = localStorage.getItem('token');
            config = {
                headers: {
                    "token": token
                }
            }
        }
        const response = await axios.get(finalUrl, config);
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

const postRequest = async (link, data, tokenRequired = false) => {
    try {
        const finalUrl = `${baseUrl}/${link}`;


        let config = {};
        if (tokenRequired) {
            const token = localStorage.getItem('token');
            config = {
                headers: {
                    "token": token
                }
            }
        }
        const response = await axios.post(finalUrl, data, config);
        return response.data;

    } catch (err) {
        console.log(err)
    }
}

const putRequest = async (link, data, tokenRequired = false) => {
    try {
        const finalUrl = `${baseUrl}/${link}`;

        let config = {};
        if (tokenRequired) {
            const token = localStorage.getItem('token');
            config = {
                headers: {
                    "token": token
                }
            }
        }
        const response = await axios.put(finalUrl, data, config);
        return response.data;

    } catch (err) {
        console.log(err)
    }
}

const deleteRequest = async (link, tokenRequired = false) => {
    try {
      const finalUrl = `${baseUrl}/${link}`;
      let config = {};
      if (tokenRequired) {
        const token = localStorage.getItem('token');
        config = {
          headers: {
            "token": token
          }
        };
      }
      const response = await axios.delete(finalUrl, config);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

export default {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest  
}
