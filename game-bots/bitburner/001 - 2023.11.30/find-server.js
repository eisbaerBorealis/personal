/** @param {NS} ns */
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

  let portPower = 0;
  if(ns.fileExists("BruteSSH.exe")) {
    portPower++;
    ns.tprint("BruteSSH.exe exists, portPower is " + portPower);
  }
  if(ns.fileExists("FTPCrack.exe")) {
    portPower++;
    ns.tprint("FTPCrack.exe exists, portPower is " + portPower);
  }
  if(ns.fileExists("relaySMTP.exe")) {
    portPower++;
    ns.tprint("relaySMTP.exe exists, portPower is " + portPower);
  }
  if(ns.fileExists("HTTPWorm.exe")) {
    portPower++;
    ns.tprint("HTTPWorm.exe exists, portPower is " + portPower);
  }
  if(ns.fileExists("SQLInject.exe")) {
    portPower++;
    ns.tprint("SQLInject.exe exists, portPower is " + portPower);
  }
  ns.tprint("    portPower is " + portPower);

  scans.delete("home");
  let finalScans = Array.from(scans);
  let bestTarget = "";
  let bestTargetMonMax = -1;
  let hackedServers = 0;
  let canHackServers = 0;
  for(let i = 0; i < finalScans.length; i++) {
    ns.tprint("  " + (i+1) + ", " + finalScans[i]);
    let server = ns.getServer(finalScans[i]);
    ns.tprint("    Lv req: " + server.requiredHackingSkill
        + ", portReq: " + server.numOpenPortsRequired
        + ", MonAvail: " + server.moneyAvailable
        + ", MonMax: " + server.moneyMax
        + ", Mon%: " + Math.floor(server.moneyAvailable / server.moneyMax * 1000) / 10
      );

    let isHacked = server.hasAdminRights;
    let canHack = ns.getHackingLevel() >= server.requiredHackingSkill && portPower >= server.numOpenPortsRequired

    if(isHacked) {
      ns.tprint("      Admin rights on " + server.hostname);
      hackedServers++;
    } else if(canHack) {
      ns.tprint("      hackskill/portPower is sufficient");
      canHackServers++;
    }
    if(server.moneyMax > 0 && (isHacked || canHack)) {
      if(server.moneyMax > bestTargetMonMax) {
        bestTargetMonMax = server.moneyMax;
        bestTarget = server.hostname;
        ns.tprint("New target: " + bestTarget + ", maxMon is " + bestTargetMonMax);
      }
    }
  }

  ns.tprint("  Hacked Servers: " + hackedServers + ", can hack " + canHackServers + " more.");
  ns.tprint("  Best target: " + bestTarget + ", maxMon is " + bestTargetMonMax);
}