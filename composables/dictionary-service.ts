import axios from "axios";

const api = 'https://api.dictionaryapi.dev/api/v2/entries';
const locale = 'en';

export const useDictionary = (word:string) => {
    return axios.get(`${api}/${locale}/${word}`).then(response => response.data);
}
