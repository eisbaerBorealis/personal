export async function main(ns) {
  var scans = new Set(ns.scan("home"));
  let stopScanning = false;
  let scanCount = 0;
  let scanCutOff = 20;

  let scansSize = scans.size;
  while(!stopScanning) {
    let tempScans = Array.from(scans);

    for(let i = 0; i < tempScans.length; i++) {
      let newScans = ns.scan(tempScans[i]);
      for(let j = 0; j < newScans.length; j++) {
        scans.add(newScans[j]);
      }
    }

    scanCount++;
    if(scanCount >= scanCutOff) {
      stopScanning = true;
    }
    if(scansSize === scans.size) {
      stopScanning = true;
      ns.tprint("    no new servers found; ending loop. scanCount is " + scanCount + " and scansSize is " + scansSize);
    } else {
      scansSize = scans.size;
    }
  }

  scans.delete("home");
  let finalScans = Array.from(scans);
  for(let i = 0; i < finalScans.length; i++) {
    let serverName = finalScans[i];
    let server = ns.getServer(serverName);

    let files = ns.ls(serverName);

    for(let j = 0; j < files.length; j++) {
      if(files[j].match(".cct")) {
        ns.tprint("Found file " + files[j] + " on server " + serverName);
      }
    }
  }
}