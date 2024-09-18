// function getValueAtPath(obj, path) {
//     return path.reduce((acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined, obj);
// }

const getValueAtPath = ((obj, path) => {
    return path.reduce((acc, key) => acc && acc[key] !== undefined ? acc[key] : undefined, obj);
})

module.exports = {getValueAtPath};