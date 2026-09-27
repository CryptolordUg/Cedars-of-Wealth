const weights={FED:40,CPI:25,NFP:30,WAR:50,ETF:30,HACK:60};
function calculateRisk(events){ return Math.min(events.reduce((t,e)=>t+(weights[e]||0),0),100); }
module.exports=calculateRisk;
