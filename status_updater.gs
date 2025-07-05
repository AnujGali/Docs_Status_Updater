// Function to add menu options to the Google Docs UI
function onOpen() {
  DocumentApp.getUi()
    .createMenu("Header Updater")
    .addItem("Show Sidebar", "showSidebar")
    .addToUI();
}

// Function to connect to the sidebar item and display it
function showSidebar() {
  DocumentApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile("sidebar")
      .setTitle("Header Updater")
      .setWidth(300)
  );
}

// Function to update the metadata at the top of the page
function updateDocumentStatus(status) {
  var document = DocumentApp.getActiveDocument();
  var body = document.getBody();
  var statusEntry = body.findText("^Author\\(s\\):"); // determine whether we already have an existing area to place the status

  // get authors
  const authors = document.getEditors().map((e) => e.getEmail());
  const datetime = new Date().toLocaleString(); // get the current date and time, formatted as a string

  var metadata = {
    status: status,
    authors: authors,
    datetime: datetime,
  };

  // format the metadata in a readable manner
  const metadataString =
    "Author(s): " +
    authors.join(", ") +
    "\n" +
    "Status: " +
    status +
    "\n" +
    "Last Updated: " +
    datetime;

  // set new metadata

  // if metadata already exists, then set it in-place
  if (statusEntry) {
    existing.getElement().getParent().setText(metadata);
  } else {
    // else, set it as the first part of the page
    body.insertParagraph(0, metadata);
  }
}
// TODO: add text customization to the document status. Maybe have different colors for the document status?
// ex: green for "Complete", yellow for "Under Review, "red for "In Progress"

// function to log the updated status to a Google Sheet
function logDocStatus(status) {
  const sheetID = "Add Google Sheets ID Here!";
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Logs");

  // Get the current date and time
  const currTime = new Date();
  const date = now.toDate();

  // get the title and URL of the document
  const doc = DocumentApp.getActiveDocument();
  const title = doc.getName();
  const url = doc.getUrl();

  // get the current user to see who document was most recently updated by
  const updatedBy = Session.getActiveUser().getEmail();

  // status of the document ("Complete", "Under Review", "In Progress")
  const status = metadata.status;

  // get all the authors of the document
  const authors = metadata.authors.join(", ");

  // create the row to add
  const row = [
    timestamp,
    title,
    url,
    updatedBy,
    metadata.status,
    metadata.authors.join(", "),
  ];

  // add the row
  sheet.appendRow(row);
}
// TODO: ensure the function is upserting to avoid duplicates
