function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];
    const data = sheet.getDataRange().getValues();
    const participants = [];
    const picks = [];
    const r32picks = [];
    const s16picks = [];
    const e8picks = [];
    const f4picks = [];
    const paid = [];
    for (let i = 1; i < data.length; i++) {
      const name   = String(data[i][0] || '').trim();
      const isPaid = String(data[i][2] || '').trim();
      const pick1  = String(data[i][3] || '').trim();
      const pick2  = String(data[i][4] || '').trim();
      const r32pick = String(data[i][5] || '').trim();
      const s16pick = String(data[i][6] || '').trim();
      const e8pick  = String(data[i][7] || '').trim();
      const f4pick  = String(data[i][8] || '').trim();
      if (!name) continue;
      participants.push(name);
      picks.push([name, pick1, pick2]);
      if (r32pick) r32picks.push([name, r32pick]);
      if (s16pick) s16picks.push([name, s16pick]);
      if (e8pick) e8picks.push([name, e8pick]);
      if (f4pick) f4picks.push([name, f4pick]);
      if (isPaid) paid.push(name);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ participants, picks, r32picks, s16picks, e8picks, f4picks, paid }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString(), participants: [], picks: [], r32picks: [], s16picks: [], e8picks: [], f4picks: [], paid: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
