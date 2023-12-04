/** @param {NS} ns */
export async function main(ns) {
  let stopScanning = false;
  let scanCount = 0;
  let scanCutOff = 20;

  var servers = [
    {'name': 'home',
     'scanned' : false}
  ];

  while(!stopScanning) {
    let newServerCount = 0;
    for(let i = 0; i < servers.length; i++) {
      if(!servers[i].scanned) {
        let prevServerName = servers[i].name;
        let newScans = ns.scan(prevServerName);

        for(let j = 0; j < newScans.length; j++) {
          let nextServerName = newScans[j];
          if(!(servers.find(e => e.name === nextServerName))) {
            servers.push({
              'name' : nextServerName,
              'scanned' : false
            });
            newServerCount++;
          }
        }
        servers[i].scanned = true;
      }
    }

    scanCount++;
    if(newServerCount === 0 || scanCount >= scanCutOff) {
      stopScanning = true;
      ns.tprint('Stop scanning: newServerCount is ' + newServerCount + ' and scanCount is ' + scanCount);
    }
  }

  let portPower = 0;
  if(ns.fileExists('BruteSSH.exe')) {
    portPower++;
  }
  if(ns.fileExists('FTPCrack.exe')) {
    portPower++;
  }
  if(ns.fileExists('relaySMTP.exe')) {
    portPower++;
  }
  if(ns.fileExists('HTTPWorm.exe')) {
    portPower++;
  }
  if(ns.fileExists('SQLInject.exe')) {
    portPower++;
  }
  ns.tprint('    portPower is ' + portPower);

  for(let i = 0; i < servers.length; i++) {
    let serverObj = servers[i];
    let serverName = serverObj.name;
    let server = ns.getServer(serverName);
    serverObj.hasAdmin = server.hasAdminRights;
    serverObj.canHack = ns.getHackingLevel() >= server.requiredHackingSkill && portPower >= server.numOpenPortsRequired;
    serverObj.moneyMax = server.moneyMax;
  }

  let sortedServers = servers.sort(
    // (s1, s2) => (s1.canHack && !(s2.canHack)) || (s1.moneyMax > s2.moneyMax)
    (s1, s2) => (
      (s1.canHack && !(s2.canHack)) || (s1.canHack === s2.canHack && s1.moneyMax > s2.moneyMax) ? 1 :
      (!(s1.canHack) && s2.canHack) || (s1.canHack === s2.canHack && s1.moneyMax < s2.moneyMax) ? -1
      : 0
    )
  );

  for(let i = 0; i < sortedServers.length; i++) {
    let serverObj = sortedServers[i];
    ns.tprint('    ' + serverObj.name + ': hasAdmin:' + serverObj.hasAdmin + ', canHack:' + serverObj.canHack + ', moneyMax:' + serverObj.moneyMax);
  }
}