var createHourBlock = function (hour, initialDescriptionValue) {
    var block = $(`
      <div class="row time-block">
        <div class="col-md-1 hour">` + renderHourText(hour) + `</div>
        <textarea class="col-md-10 description"></textarea>
        <button class="btn saveBtn col-md-1"><i class="fas fa-save"></i></button>
      </div>
    `)
    var description = block.find(".description")
    var saveButton = block.find(".saveBtn")
  
    // Initialize description content
    description.val(initialDescriptionValue)
  
    // Save current description content on click
    saveButton.on('click', function () { setDescription(hour, description.val()) })
  
    // Update past/present/future immediately and then once per minute
    var update = function () { updateTimeCategory(block, hour) }
    update()
    setInterval(update, 60000)
    
    return block
  }
  
  // Given an hour in 24-hour time, return the corresponding 12-hour time string
  // e.g., 0 -> "12AM", 9 -> "9AM", 15 -> "3PM"
  var renderHourText = function (hour) {
    var number = (hour % 12) || 12
    var period = hour < 12 ? "AM" : "PM"
    return number + period
  }
  
  // Update the past/present/future status of an hour block
  var updateTimeCategory = function (block, hour) {
    // Clear existing time category
    block.removeClass("past present future")
    // Set new time category
    var currentHour = moment().hours()
    var timeCategory =
        hour <   currentHour ? "past"
      : hour === currentHour ? "present"
      : hour >   currentHour ? "future"
      : undefined
    block.addClass(timeCategory)
  }
  
  // Update the current day immediately and then once per minute
  var updateCurrentDay = function () {
    var today = moment().format("dddd, MMMM Do")
    $("#currentDay").text(today)
  }
  updateCurrentDay()
  setInterval(updateCurrentDay, 60000)
  
  // The (inclusive) range of hours covered by the scheduler, in 24-hour time.
  const LO_HOUR = 9
  const HI_HOUR = 17
  
  // Create the scheduler body
  for (var hour = LO_HOUR; hour <= HI_HOUR; hour++) {
    var storedDescription = getDescription(hour)
    var hourBlock = createHourBlock(hour, storedDescription)
    $(".container").append(hourBlock)
  }