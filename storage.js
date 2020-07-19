const STORAGE_KEY = 'descriptions'

var getDescriptions = function () {
  var maybeDescriptionsJSON = localStorage.getItem(STORAGE_KEY)
  var maybeDescriptions = JSON.parse(maybeDescriptionsJSON)
  var descriptions = maybeDescriptions || {}
  return descriptions
}

// var getDescriptions = function () {
//   return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
// }

var setDescriptions = function (descriptions) {
  var descriptionsJSON = JSON.stringify(descriptions)
  localStorage.setItem(STORAGE_KEY, descriptionsJSON)
}

// var setDescriptions = function (descriptions) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(descriptions))
// }

var getDescription = function (hour) {
  var descriptions = getDescriptions()
  var maybeDescription = descriptions[hour]
  var description = maybeDescription || ""
  return description
}

// var getDescription = function (hour) {
//   return getDescriptions()[hour] || ""
// }

var setDescription = function (hour, text) {
  var descriptions = getDescriptions() 
  descriptions[hour] = text
  setDescriptions(descriptions)
}

// var setDescription = function (hour, text) {
//   setDescriptions({...getDescriptions(), [hour]: text})
// }