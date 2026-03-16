function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();
    const participants = [];
    const picks = [];
    const paid = [];
    for (let i = 1; i < data.length; i++) {
      const name   = String(data[i][0] || '').trim();
      const isPaid = String(data[i][2] || '').trim();
      const pick1  = String(data[i][3] || '').trim();
      const pick2  = String(data[i][4] || '').trim();
      if (!name) continue;
      participants.push(name);
      picks.push([name, pick1, pick2]);
      if (isPaid) paid.push(name);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ participants, picks, paid }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString(), participants: [], picks: [], paid: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
