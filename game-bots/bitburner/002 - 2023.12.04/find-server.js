/** @param {NS} ns */
export async function main(ns) {
  var target = ns.args[0];
  let targetIndex = -1;
  let stopScanning = false;
  let scanCount = 0;
  let scanCutOff = 20;

  var servers = [
    {'name': 'home',
     'address' : 'home',
     'scanned' : false}
  ];

  while(!stopScanning) {
    let newServerCount = 0;
    ns.tprint('scan ' + scanCount + ', servers.length is ' + servers.length);
    for(let i = 0; i < servers.length; i++) {
      if(!servers[i].scanned) {
        let prevServerName = servers[i].name;
        let newScans = ns.scan(prevServerName);

        for(let j = 0; j < newScans.length; j++) {
          let nextServerName = newScans[j];
          if(!(servers.find(e => e.name === nextServerName))) {
            servers.push({
              'name' : nextServerName,
              'address' : nextServerName + ' < ' + servers[i].address,
              'scanned' : false
            });
            newServerCount++;
          }
          if(nextServerName === target) {
            j = newScans.length;
            stopScanning = true;
            targetIndex = servers.length - 1;
            ns.tprint('found target ' + target);
          }
        }
        servers[i].scanned = true;
        if(stopScanning) {
          i = servers.length;
        }
      }
    }
    scanCount++;
    if(newServerCount === 0 || scanCount >= scanCutOff) {
      stopScanning = true;
      ns.tprint('Stop scanning: newServerCount is ' + newServerCount + ' and scanCount is ' + scanCount);
    }
  }
  
  if(targetIndex === -1) {
    ns.tprint('server not found');
  } else {
    let serverObj = servers[targetIndex];
    ns.tprint('\n    ' + serverObj.address);
  }
}