let readline=require("readline-sync");
let slog=require("single-line-log").stdout;
//睡眠函数
exports.sleep=function(sleepTime){
	let now=new Date();
	let endTime=now.getTime()+sleepTime;
	while(true){
		now=new Date();
		if(now.getTime()>endTime){
			return;
		}
	}
}
//进度函数
exports.ProgressBar=function(str1,str2){
	for(let i =0;i<=100;i++){
		if(i==100){
			slog(str2);
			console.log("");
			continue;
		}
		slog(str1,i,"%");
		exports.sleep(20);
	}
}