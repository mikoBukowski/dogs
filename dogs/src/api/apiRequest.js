import axios from 'axios'

export async function commonObjectGet(url){
    const {data} = await axios.get(url)
    return data;
}