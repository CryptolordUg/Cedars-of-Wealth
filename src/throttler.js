function throttle(risk){
 if(risk>=90) return {leverage:1,positionSize:0,allowTrades:false};
 if(risk>=70) return {leverage:2,positionSize:0.25,allowTrades:true};
 if(risk>=50) return {leverage:5,positionSize:0.50,allowTrades:true};
 return {leverage:10,positionSize:1,allowTrades:true};
}
module.exports=throttle;
