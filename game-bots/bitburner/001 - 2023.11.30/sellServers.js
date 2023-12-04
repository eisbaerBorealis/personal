export async function main(ns) {
  var servers = ns.getPurchasedServers();

  ns.tprint('server list size: ' + ns.getPurchasedServers().length);
  
  let loopCount = 0;
  while(ns.getPurchasedServers().length > 0 && loopCount < 50) {
    ns.deleteServer(ns.getPurchasedServers()[0]);
    loopCount++;
  }
  ns.tprint('server list size: ' + ns.getPurchasedServers().length);
}