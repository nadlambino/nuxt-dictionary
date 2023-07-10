export const usePluralize = (word, data) => {
    return data.length > 1 ? word + 's' : word;
}