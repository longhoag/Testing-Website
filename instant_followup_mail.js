
/**
 * Installs a trigger on the Spreadsheet for when a Form response is submitted.
 */
function installTrigger() {
  ScriptApp.newTrigger('onFormSubmit')
      .forSpreadsheet(SpreadsheetApp.getActive())
      .onFormSubmit()
      .create();
}

/**
 * Sends a customized email for every response on a form.
 * 
 * @param {Object} event - Form submit event
 */
function onFormSubmit(e) {
  var responses = e.namedValues;
  // If the question title is a label, it can be accessed as an object field.
  // If it has spaces or other characters, it can be accessed as a dictionary.
  var timestamp = responses.Timestamp[0];
  var email = responses['Email Address'][0].trim();
  var name = responses.Names[0].trim();
  var TemplateText = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2T").getRange(1,1).getValue();
  var message = TemplateText.replace("{SPL}", timestamp).replace("{Full Name}", name).replace("{Selected Council}", email);
  // If there is at least one topic selected, send an email to the recipient.
  var status = '';
  var subject = 'hello this is a test';
  var emailAddress = email;
  
  if (4 > 0) {
    GmailApp.sendEmail(emailAddress, subject, message, {
        name: "Hanoi Model UN"});
    status = 'Sent';
  }
  else {
    status = 'No topics selected';
  }

  // Append the status on the spreadsheet to the responses' row.
  var sheet = SpreadsheetApp.getActiveSheet();
  var row = sheet.getActiveRange().getRow();
  var column = e.values.length + 1;
  sheet.getRange(row, column).setValue(status);

}

