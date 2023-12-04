/** @param {NS} ns */
export async function main(ns) {
  var target = ns.args[0];
  var hackScript = "main-hack.js";
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
  let newHacked = 0;
  let totalHacked = 0;
  for(let i = 0; i < finalScans.length; i++) {
    let serverName = finalScans[i];
    let server = ns.getServer(serverName);

    let isHacked = server.hasAdminRights;
    // let canHack = ns.getHackingLevel() >= server.requiredHackingSkill && portPower >= server.numOpenPortsRequired
    let canHack = portPower >= server.numOpenPortsRequired

    if(canHack && !isHacked) {
      if(ns.fileExists("BruteSSH.exe")) {
        ns.brutessh(serverName);
      }
      if(ns.fileExists("FTPCrack.exe")) {
        ns.ftpcrack(serverName);
      }
      if(ns.fileExists("relaySMTP.exe")) {
        ns.relaysmtp(serverName);
      }
      if(ns.fileExists("HTTPWorm.exe")) {
        ns.httpworm(serverName);
      }
      if(ns.fileExists("SQLInject.exe")) {
        ns.sqlinject(serverName);
      }
      ns.nuke(serverName);
      newHacked++;
    }

    if(canHack) {
      ns.killall(serverName);
      if(!ns.fileExists(hackScript, serverName)) {
        ns.scp(hackScript, serverName);
      }
      let scriptRam = ns.getScriptRam(hackScript, serverName);
      let threadCount = Math.floor(server.maxRam / scriptRam);

      if(threadCount > 0) {
        ns.exec(hackScript, serverName, threadCount, target);

        ns.tprint("Running " + threadCount + " threads on " + serverName + " targetting " + target);
        totalHacked++;
      } else {
        ns.tprint("Could not run any threads on " + serverName + " (maxRam is " + server.maxRam + ")");
      }
    }
  }

  let serverName = "home";
  let server = ns.getServer(serverName);
  let scriptRam = ns.getScriptRam(hackScript, serverName);
  let serverRam = server.maxRam - ns.getScriptRam("ultimate.js", serverName);
  // ns.tprint("home serverRam is " + serverRam);
  let threadCount = Math.floor(serverRam / scriptRam);
  
  if(threadCount > 0) {
    ns.killall(serverName);
    ns.run(hackScript, threadCount, target);
    ns.tprint("Running " + threadCount + " threads on " + serverName + " targetting " + target);
    totalHacked++;
  }
  
  ns.tprint("COMPLETED. Hacked " + newHacked + " new servers and running scripts on " + totalHacked + " servers");
}