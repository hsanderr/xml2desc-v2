let fileHandle;
butOpenFile.addEventListener('click', async () => {
  [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  document.getElementById('in').value = contents;
});

function notEqualToZero(time) {
  return time > 0;
}

function myFunction() {
  var z = document.getElementById('in').value;
  var x = z.substring(
    z.indexOf('<xmpDM:markers>'),
    z.indexOf('</xmpDM:markers>')
  );
  console.log(x);
  var regex1 = /name/g,
    regex2 = /startTime/g,
    ind1 = [],
    result1,
    ind2 = [],
    result2;
  while ((result1 = regex1.exec(x))) {
    ind1.push(result1.index);
  }
  while ((result2 = regex2.exec(x))) {
    ind2.push(result2.index);
  }
  document.getElementById('out').innerHTML = '';
  var y = [],
    t = [],
    th = [],
    tmin = [],
    ts = [],
    th_str = [],
    tmin_str = [],
    ts_str = [],
    i = 0,
    j;
  for (j = 0; j < ind1.length; j++) {
    if (x.substring(ind1[j] + 6, ind1[j] + 11) != 'Slide') {
      y[i] = x.substring(ind1[j] + 6, ind2[j] - 8);
      t[i] = parseInt(
        x.substring(ind2[j] + 11, x.indexOf(`"`, ind2[j] + 11)),
        10
      );
      tmin[i] = Math.floor(t[i] / 60000);
      th[i] = Math.floor(tmin[i] / 60);
      ts[i] = Math.round((t[i] / 60000 - Math.floor(t[i] / 60000)) * 60);
      console.log(t[i]);
      th_str[i] = th[i].toString();
      tmin_str[i] = tmin[i].toString();
      if (tmin[i] < 10) {
        tmin_str[i] = '0' + tmin_str[i];
      }
      ts_str[i] = ts[i].toString();
      if (ts[i] < 10) {
        ts_str[i] = '0' + ts_str[i];
      }
      i++;
    }
  }
  for (i = 0; i < y.length; i++) {
    if (th.some(notEqualToZero) === true) {
      document.getElementById('out').innerHTML += th_str[i];
      document.getElementById('out').innerHTML += ':';
    }
    document.getElementById('out').innerHTML += tmin_str[i];
    document.getElementById('out').innerHTML += ':';
    document.getElementById('out').innerHTML += ts_str[i];
    document.getElementById('out').innerHTML += '&nbsp';
    document.getElementById('out').innerHTML += y[i];
    document.getElementById('out').innerHTML += '\n';
  }
}
