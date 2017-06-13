export function formatDate(dateObject) {
  var date = (dateObject.getDate()).toString().padStart(2, 0)
  var month = (dateObject.getMonth() + 1).toString().padStart(2, 0)
  var year = dateObject.getFullYear()

  return year + '-' + month + '-' + date
}
