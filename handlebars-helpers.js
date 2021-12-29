const moment = require("moment");
const handlebarsHelpers = {
    'pretty-date': (date) => {
        return moment(new Date(date)).format('YYYY-MM-DD');
    }
}

module.exports = {
    handlebarsHelpers,
}