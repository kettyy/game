let readline=require("readline-sync");
let slog=require("single-line-log").stdout;
let fuc=require("./function.js");
//玩家构造函数
exports.Player=function(name,piece){
	this.name=name;
	this.readyMoney=0;
	this.balance=0;
	this.totalMoney=this.readyMoney+this.balance;
	this.lottery=-1;
	this.house=[];
	this.stopRound=0;
	this.piece=piece;
	this.position=0;
}
//玩家摇骰子方法
exports.Player.prototype.dice=function(){
	let point=Math.ceil(Math.random()*6);
	this.position+=point;
	if(this.position>51){
		this.position-=52;
	}
	fuc.ProgressBar(this.name+"摇骰子中...","您摇到的点数为："+point);
	console.log("您当前位于第",this.position,"街区");
}
//玩家移动方法
exports.Player.prototype.movePiece=function(sys){
	let position1=sys.mapArr[this.position].position[0];
	let position2=sys.mapArr[this.position].position[1];
	[sys.map[position1][position2],this.piece]=[this.piece,sys.map[position1][position2]];
}
//玩家扣款方法
exports.Player.prototype.deductMoney=function(money){
	if(this.readyMoney>=money){
		this.readyMoney-=money;
	}
	else{
		money-=this.readyMoney;
		this.readyMoney=0;
		this.balance-=money;
	}
}
//系统构建函数
exports.Sys=function(){
	this.mapArr=[{value:"起点",position:[1,0]},
				{value:"房",master:"",position:[1,1]},
				{value:"房",master:"",position:[1,2]},
				{value:"房",master:"",position:[1,3]},
				{value:"好运",position:[1,4]},
				{value:"房",master:"",position:[1,5]},
				{value:"房",master:"",position:[1,6]},
				{value:"房",master:"",position:[1,7]},
				{value:"厄运",position:[1,8]},
				{value:"房",master:"",position:[1,9]},
				{value:"房",master:"",position:[1,10]},
				{value:"好运",position:[1,11]},
				{value:"房",master:"",position:[1,12]},
				{value:"房",master:"",position:[1,13]},
				{value:"房",master:"",position:[1,14]},
				{value:"房",master:"",position:[1,15]},
				{value:"好运",position:[1,16]},
				{value:"房",master:"",position:[1,17]},
				{value:"医院",position:[1,18]},
				{value:"房",master:"",position:[2,18]},
				{value:"房",master:"",position:[3,18]},
				{value:"好运",position:[4,18]},
				{value:"房",master:"",position:[5,18]},
				{value:"房",master:"",position:[6,18]},
				{value:"房",master:"",position:[7,18]},
				{value:"房",master:"",position:[8,18]},
				{value:"厄运",position:[9,18]},
				{value:"房",master:"",position:[9,17]},
				{value:"好运",position:[9,16]},
				{value:"房",master:"",position:[9,15]},
				{value:"房",master:"",position:[9,14]},
				{value:"厄运",position:[9,13]},
				{value:"房",master:"",position:[9,12]},
				{value:"房",master:"",position:[9,11]},
				{value:"房",master:"",position:[9,10]},
				{value:"房",master:"",position:[9,9]},
				{value:"厄运",position:[9,8]},
				{value:"房",master:"",position:[9,7]},
				{value:"房",master:"",position:[9,6]},
				{value:"厄运",position:[9,5]},
				{value:"房",master:"",position:[9,4]},
				{value:"房",master:"",position:[9,3]},
				{value:"好运",position:[9,2]},
				{value:"房",master:"",position:[9,1]},
				{value:"监狱",master:"",position:[9,0]},
				{value:"房",master:"",position:[8,0]},
				{value:"好运",position:[7,0]},
				{value:"房",master:"",position:[6,0]},
				{value:"房",master:"",position:[5,0]},
				{value:"房",master:"",position:[4,0]},
				{value:"厄运",position:[3,0]},
				{value:"房",master:"",position:[2,0]}];
	this.map=[
			[""],
			["[起]","[房]","[房]","[房]","[吉]","[房]","[房]","[房]","[恶]","[房]","[房]","[吉]","[房]","[房]","[房]","[房]","[吉]","[房]","[医]"],
			["[房]","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","[房]"],
			["[恶]","    ","    "," 欢 ","    ","    ","    "," 迎 ","    ","    ","    "," 来 ","    ","    ","    "," 到 ","    ","    ","[房]"],
			["[房]","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","[吉]"],
			["[房]","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","[房]"],
			["[房]","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","[房]"],
			["[吉]","    ","    ","    ","    "," 大 ","    ","    ","    "," 富 ","    ","    ","    "," 翁 ","    ","    ","    ","    ","[房]"],
			["[房]","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","    ","[房]"],
			["[监]","[房]","[吉]","[房]","[房]","[恶]","[房]","[房]","[恶]","[房]","[房]","[房]","[房]","[恶]","[房]","[房]","[吉]","[房]","[恶]"],
			[""]
		];
	this.lottery;
	this.playerArr=[];
	this.round=0;
}
//系统打印地图
exports.Sys.prototype.printMap=function(){
	for(let i in this.map){
		let str="";
		for(let j in this.map[i]){
			str+=this.map[i][j];
		}
		console.log(str);
	}
}
//系统彩票中奖方法
exports.Sys.prototype.getLottery=function(i){
	if(this.lottery==this.playerArr[i].lottery){
		this.playerArr[i].balance+=10000;
		return 1;
	}
	else{
		return 0;
	}
}
//系统购买彩票方法
exports.Sys.prototype.buyLottery=function(i){
	if(this.playerArr[i].readyMoney>=500&&this.playerArr[i].lottery==-1){
		this.playerArr[i].readyMoney-=500;
		return true;
	}
	else{
		return false;
	}
}
//系统存钱方法
exports.Sys.prototype.saveMoney=function(i,money){
	if(this.playerArr[i].readyMoney>=money){
		this.playerArr[i].readyMoney-=money;
		this.playerArr[i].balance+=money;
		console.log("钱已存入！");
	}
	else{
		console.log("您没有这么多现金！");
	}
}
//系统取钱方法
exports.Sys.prototype.drawMoney=function(i,money){
	if(this.playerArr[i].balance>=money){
		this.playerArr[i].balance-=money;
		this.playerArr[i].readyMoney+=money;
		console.log("钱已取出！");
	}
	else{
		console.log("您卡上没有这么多钱！");
	}
}

//系统买房方法
exports.Sys.prototype.buyHouse=function(i,x){
	let index=this.mapArr[this.playerArr[i].position];
	if(!x&&index.master==""){
		let judge=true;
		while(judge){
			console.log("这是一栋空房子哟~要买下来吗~【500一套】（Y/N）");
			let choose=readline.question("");
			let p=/^[YNyn]{1}$/;
			if(p.test(choose)){
				if (choose=="Y"||choose=="y") {
					if(this.playerArr[i].totalMoney<500){
						console.log("您没有那么多钱！");
					}
					else{
						this.playerArr[i].deductMoney(500);
						this.playerArr[i].house.push(index);
						index.master=this.playerArr[i].name;
						console.log("购房成功！");
					}
					judge=false;
				}
			}
			else{
				console.log("手滑了吗~请重新输入...");
			}
		}
	}
	else if(x&&index.master==""){
		if(this.playerArr[i].totalMoney<500){
			console.log("您没有那么多钱！");
		}
		else{
			this.playerArr[i].deductMoney(500);
			this.playerArr[i].house.push(index);
			index.master=this.playerArr[i].name;
			console.log("购房成功！");
		}
	}
	else if(index.master!=this.playerArr[i].name){
		let j;
		for(j in this.playerArr){
			if(this.playerArr[j].name==index.master){
				break;
			}
		}
		console.log("你路过了",index.master,"的房产，需交过路费300~");
		this.playerArr[i].deductMoney(300);
		this.saveMoney(j,300);
	}
}
//系统好运事件
exports.Sys.prototype.lucky=function(i){
	let luckyStrs=[{describe:"你参与植树造林活动，获得了500元奖金！",money:500},
					{describe:"这个月业绩不错，老板给你发了800元奖金！",money:800},
					{describe:"你的项目给公司带来了巨大的利润，老板决定给你升职加薪，并获得5000元奖金！",money:5000},
					{describe:"你在沙滩捡贝壳，捡到了一颗珍珠，卖掉后获得了1000元！",money:1000},
					{describe:"你被天降红包砸中，获得了600元！",money:600},
					{describe:"你扶老奶奶过马路，获得了300元奖金！",money:300},
					{describe:"你见义勇为，获得了500元奖金！",money:500},
					{describe:"你周末到街上发传单，赚得了1000元！",money:1000},
					{describe:"你偶遇马云爸爸，获得了2000元红包！",money:2000},
					{describe:"你偶遇郭炜炜，他送了你一套外观，你转手卖掉，获得了688元！",money:688},
					{describe:"你整理衣柜时翻到了300元现金！",money:300},
					{describe:"你走在街上，突然有个人硬塞了700元给你！",money:700}
					];
	let n=Math.floor(Math.random()*luckyStrs.length);
	console.log(luckyStrs[n].describe,"美滋滋~");
	console.log("");
	this.playerArr[i].readyMoney+=luckyStrs[n].money;
}
//系统厄运事件
exports.Sys.prototype.badLuck=function(i){
	//describe事件描述   money损失金钱   eventNum事件编号，判断执行什么操作（0住院  1入狱  2损失现金  3损失卡上余额）
	let badLuckStrs=[{describe:"天上掉下一口锅，你受伤啦！",money:0,eventNum:0},
					{describe:"遇到恶犬，你被咬伤！",money:0,eventNum:0},
					{describe:"你被超速的汽车撞伤！",money:0,eventNum:0},
					{describe:"你遭遇了抢劫犯，拼死抵抗，受了重伤！",money:0,eventNum:0},
					{describe:"你多年以后才知道给别人白养了儿子，气到住院！",money:0,eventNum:0},
					{describe:"你找到了给你戴绿帽子的人，一时冲动打伤了他！",money:0,eventNum:1},
					{describe:"你被当成抢劫犯，但是不够钱保释！",money:0,eventNum:1},
					{describe:"你遭遇了小偷，损失了700元！",money:700,eventNum:2},
					{describe:"你老婆生了一个儿子，你高兴坏了，给她包了1000元红包！",money:1000,eventNum:2},
					{describe:"你在街边遇上可怜的人,你同情他,却没想到这人是骗子，损失了500元！",money:500,eventNum:2},
					{describe:"双十一你老婆花了1000元，刷的是你的卡~",money:1000,eventNum:2},
					{describe:"你遭遇了抢劫犯，不敢抵抗，损失了所有现金！！",money:this.playerArr[i].readyMoney,eventNum:3},
					{describe:"你遭遇了黑客，银行账号被盗，卡上余额归0！",money:this.playerArr[i].balance,eventNum:4},
					{describe:"国庆你老婆和情人出去旅游，刷爆了你的卡~",money:this.playerArr[i].balance,eventNum:4}];
	let n=Math.floor(Math.random()*badLuckStrs.length);
	console.log(badLuckStrs[n].describe);
	switch(badLuckStrs[n].eventNum){
		case 0:
		case 1:{
			this.playerArr[i].movePiece(this);
			if(badLuckStrs[n].eventNum==0){
				fuc.sleep(500);
				console.log("救护车正在赶来...");
				fuc.sleep(500);
				console.log("您需住院三个回合~");
				this.playerArr[i].position=18;
			}
			else{
				fuc.sleep(500);
				console.log("警车正在赶来...");
				fuc.sleep(500);
				console.log("您需入狱三个回合~");
				this.playerArr[i].position=44;
			}
			console.log("");
			this.playerArr[i].movePiece(this);
			this.playerArr[i].stopRound=3;
			break;
		}
		case 2:
			this.playerArr[i].deductMoney(badLuckStrs[n].money);
			break;
		case 3:
			this.playerArr[i].readyMoney=0;
			break;
		case 4:
			this.playerArr[i].balance=0;
			break;
	}
	console.log("");
}
