function maxDrawdown(curve){
 let peak=curve[0],maxDD=0;
 for(const e of curve){peak=Math.max(peak,e); maxDD=Math.max(maxDD,(peak-e)/peak*100);}
 return maxDD;
}
module.exports=maxDrawdown;
