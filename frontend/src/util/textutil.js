import _ from 'lodash'


export function truncate(text, len, suffix = "") {
    let ret = ""
    if (text && text.length <= len) {
        ret = text
    } else {
        ret = text.split(" ", len).join(" ")
        if (suffix) {
            ret = ret + suffix
        }
    }

    return ret
}

export function sort(arr, field, dir) {
    let sorted = _.sortBy(arr, [field])
    if (dir === "desc") {
        sorted = sorted.reverse()
    }
    return sorted
}