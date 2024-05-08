
const API_URL = process.env.REACT_APP_API_URL

async function fetchService(url, method, body = null) {

    let option = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        }
    }

    if (body) {
        option.body = JSON.stringify(body);
    }

    try {
        let response = await fetch(API_URL + url, option);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}
export default fetchService;