import axios from 'axios'

export async function api(url){
    const {data} = await axios.get(url)
    return data;
}