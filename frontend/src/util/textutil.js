export function truncate(text, len, suffix="") {
    let ret = ""
    if(text && text.length <= len) {
        ret = text
    } else {
        ret = text.split(" ", len).join(" ")
        if(suffix) {
            ret = ret + suffix
        }
    }

    return ret
}