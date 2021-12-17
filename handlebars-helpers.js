const handlebarsHelpers = {
    'pretty-date': (date) => {
        return new Date(date).toDateString();
    }
}

module.exports = {
    handlebarsHelpers,
}