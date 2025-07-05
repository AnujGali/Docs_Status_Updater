# Google Docs Status Updater
An Google Apps Script Project I made to help formatting documentation at my volunteering position. 

# Why I Created This 
After creating a formatting guide for future documentation, which maintained a status of the document at the top, I felt it might be cumbersome for somebody to constantly update it manually. So I decided to create a Google Docs Add-On to automatically update this status. I also added a feature that stores all documents' status inside a Google Sheets document, so that all the information can be viewed easily. 

# Stack 
The main functionality was coded in JavaScript (comntained inside the .gs file), which accesses the Google Document and takes care of dynamically updating the document status. It also updates the Google Sheets after this. I have also coded a simple sidebar frontend using HTML and some embedded JavaScript, which is used to obtain information from the user. 
