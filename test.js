const _ = require('lodash')

const res = `
+ // FIXME:
+ // TODO: dce
- // TODO: dce
+ /**
+ * TODO: test
+ * TODO: test
+ /
`;
const rx = /^(\+|\-).*(?:\/\/|\/\*\*|\*)\s*((TODO|FIXME):(.*)$)/gm


const matches = getMatches(res, rx, 2);

console.log(matches)
Object.keys(matches)
    .filter(key => matches[key] >= 1)
    .filter(key => {
        const [_, task] = key.split(':');
        return task
    })
    .map(_.trim)
    .map(s => {
        console.log(s);
    })

function getMatches(string, regex, index) {
    index || (index = 0)
    const matches = {}
    let match

    while (match = regex.exec(string)) {
        const sign = match[1];
        const task = match[2];

        sign == '+'
            ? matches[task] = !matches[task] ? 1 : matches[task] + 1
            : matches[task] = !matches[task] ? 0 : matches[task] - 1;
    }

    return matches
}

