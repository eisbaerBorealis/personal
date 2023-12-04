export async function main(ns) {
  //  var serverSize = Number(ns.args[0]);
    var moneyPercent = Number(ns.args[0]);
    var player = ns.getPlayer();
    var money = player.money;
    // ns.tprint('player money: ' + money);
    var budget = Math.floor(moneyPercent * money);
    // ns.tprint('budget: ' + budget);
    var serverName = 'eisbaer' + (ns.getPurchasedServers().length + 1).toString().padStart(3,'0');
  
    var serverSize = 2;
    var moneyPerGB = 55000;
  
    while(serverSize * 2 * moneyPerGB < budget &&
          serverSize * 2 <= ns.getPurchasedServerMaxRam()) {
      serverSize *= 2;
    }
  
    ns.tprint('serverSize will be ' + serverSize + ', costing $' + serverSize * moneyPerGB);
  
    ns.purchaseServer(serverName,serverSize);
  
    ns.tprint('Created server ' + serverName + '');
  }