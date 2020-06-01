import axios from 'axios';

const baseUrl = 'https://dog.ceo/api';

export const fetchAllBreeds = () => {
    return axios.get(`${baseUrl}/breeds/list/all`);
}

export const fetchBreedRandomImage = (breed) => {
    return axios.get(`${baseUrl}/breed/${breed}/images/random`)
}

export const fetchBreedImages = (breed) => {
    return axios.get(`${baseUrl}/breed/${breed}/images/random/20`)
}