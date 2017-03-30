const fs = require('fs');
const Xtemplate = require('xtemplate');

const tpl = fs.readFile('./tpl.xtpl').toString();

module.exports = {
    render(idx) {
        const str = new Xtemplate(tpl).render({ a: 'for test', idx });
        // return new Buffer(str); // this is too slow ...
        return str;
    }
};
