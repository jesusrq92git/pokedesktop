import instance from '../utils/axios';
import { ENDPOINT_POKEMON, ENDPOINT_POKEMON_ESPECIES } from '../utils/endpoints'

export const getPokemons = (quantity) => {
    return new Promise((resolve, reject) => {
        instance.get(`${ENDPOINT_POKEMON}/?limit=${quantity}`)
            .then(function(res){
                resolve(res.data)
            })
            .catch(function(err){
                reject(err)
            })
    })
}

export const getPoke = (id) => {
    return new Promise((resolve, reject) => {
        instance.get(`${ENDPOINT_POKEMON}/${id}`)
            .then(function(res){
                resolve(res.data)
            })
            .catch(function(err){
                reject(err)
            })
    })
}

export const getPokeSpecies = (id) => {
    return new Promise((resolve, reject) => {
        instance.get(`${ENDPOINT_POKEMON_ESPECIES}/${id}`)
            .then(function(res){
                resolve(res.data)
            })
            .catch(function(err){
                reject(err)
            })
    })
}