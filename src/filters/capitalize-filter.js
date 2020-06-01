// returning breed with camel case format
const formattedBreedName = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

export default formattedBreedName;