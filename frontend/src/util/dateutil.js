import moment from "moment"

export function formatDate(dateAsTimestamp) {
    return moment(dateAsTimestamp).format('MMMM Do YYYY, h:mm:ss a')
}