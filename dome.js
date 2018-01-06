//选择判断函数
let choose=function(str,n){
	while(true){
		console.log(str);
		let choose = parseInt(readline.question(""));
		if(choose>0&&choose<=n){
			return choose;
		}
		else{
			console.log("输入错误，请重新输入...");
		}
	}
}
//模式选择函数
let chooseMode=function(sys){
	let initial;
	switch(choose("请选择难度模式：1.简单  2.普通  3.困难",3)){
		case 1:
			initial=100000;//简单模式初始金额100000
			break;
		case 2:
			initial=10000;//普通模式初始金额10000
			break;
		case 3:
			initial=5000;//困难模式初始金额5000
			break;
	}
	for(let i in sys.playerArr){
		sys.playerArr[i].totalMoney=initial;
		sys.playerArr[i].readyMoney=initial;
	}
}
let move=function(sys,i,x=0){
	if(sys.playerArr[i].position==0){
		console.log("您当前位于起点");
	}
	else{
		console.log("您当前位于第",sys.playerArr[i].position,"街区");
	}
	sys.printMap();
	let p=/[●○◆★▲]/;
	if(!p.test(sys.playerArr[i].piece)){
		sys.playerArr[i].movePiece(sys);
	}
	sys.playerArr[i].dice();
	let position1=sys.mapArr[sys.playerArr[i].position].position[0];
	let position2=sys.mapArr[sys.playerArr[i].position].position[1];
	if(!p.test(sys.map[position1][position2])){
		sys.playerArr[i].movePiece(sys);
	}
	sys.printMap();
	switch(sys.mapArr[sys.playerArr[i].position].value){
		case "房":{
			sys.buyHouse(i,x);
			break;
		}
		case "厄运":{
			fuc.ProgressBar("厄运降临中...","真不幸~");
			sys.badLuck(i);
			break;
		}
		case "好运":{
			fuc.ProgressBar("好运降临中...","恭喜你！");
			sys.lucky(i);
			break;
		}
	}
	if(sys.playerArr[i].totalMoney<=0){
		console.log("您已破产！游戏结束！");
	}
}
let playerOperation=function(sys){
	let p=/^(电脑)/;
	let stopGame=false;
	for(let i =0;i<sys.playerArr.length;i++){
		console.log("当前玩家为：",sys.playerArr[i].name);
		if(sys.playerArr[i].stopRound!=0){
			if(sys.playerArr[i].position==18){
				console.log(sys.playerArr[i].name,"还在医院养伤中，还剩",sys.playerArr[i].stopRound,"个回合~");
			}
			else{
				console.log(sys.playerArr[i].name,"还在监狱服刑，还剩",sys.playerArr[i].stopRound,"个回合~");
			}
			sys.playerArr[i].stopRound--;
			continue;
		}
		sys.playerArr[i].balance+=(sys.playerArr[i].balance*0.001);
		if(!p.test(sys.playerArr[i].name)){
			let playing=true;
			while(playing){
				switch(choose("请选择您的操作：1.购买彩票  2.前往银行  3.查看角色信息  4.出发  5.退出",5)){
					case 1:{
						let judge =true;
						while(judge){
							switch(choose("请输入您的操作：1.购买  2.查看游戏规则  3.返回",3)){
								case 1:{
									let n=true;
									while(n){
										console.log("请输入您要购买的彩票号码（0-9）：");
										let lotteryNum = readline.question("");
										let p=/^[0-9]{1}$/;
										if(p.test(lotteryNum)){
											if(sys.buyLottery(i)){
												sys.playerArr[i].lottery=lotteryNum;
												console.log("购买成功！");
											}
											else{
												if(sys.playerArr[i].lottery!=-1){
													console.log("一次只能购买一注，不能贪心哦~");
												}
												else{
													console.log("您的现金还不够买彩票，请取钱后再来~");
												}
											}
											n=false;
										}
										else{
											console.log("输入错误，请重新输入...");
										}
									}
									break;
								}
								case 2:{
									let strArr=["彩票说明：","彩票每4回合开一次奖","开奖号码会从0-9当中随机摇出一个号码","若玩家购买彩票的号码与开奖号码相同，即为中奖","奖金为10000元","每注彩票的价格为500，每次买一注",""];
									for(let i in strArr){
										console.log(strArr[i]);
										fuc.sleep(500);
									}
									break;
								}
								case 3:
									judge=false;
							}
						}
						break;
					}
					case 2:{
						console.log("欢迎来到银行，存入的现金每回合将返还您0.1%的利息~");
						let judge =true;
						while(judge){
							switch(choose("请选择您的操作：1.存钱  2.取钱  3.查询  4.返回",4)){
								case 1:{
									console.log("请输入您要存入的金额：");
									let money = parseInt(readline.question(""));
									sys.saveMoney(i,money);
									break;
								}
								case 2:{
									console.log("请输入您要取出的金额：");
									let money = parseInt(readline.question(""));
									sys.drawMoney(i,money);
									break;
								}
								case 3:{
									console.log("您卡上的余额为：",sys.playerArr[i].balance);
									break;
								}
								case 4:
									judge=false;
							}
						}
						break;
					}
					case 3:{
						console.log("玩家名",sys.playerArr[i].name);
						console.log("您目前持有的总财产为：",sys.playerArr[i].totalMoney);
						console.log("您所持有的现金为：",sys.playerArr[i].readyMoney);
						console.log("您卡上的余额为：",sys.playerArr[i].balance);
						if(sys.playerArr[i].lottery==-1){
							console.log("彩票信息：目前没有持有彩票");
						}
						else{
							console.log("彩票信息：目前您持有的点数为",sys.playerArr[i].lottery);
						}
						if(sys.playerArr[i].house.length==0){
							console.log("房产信息：目前名下没有房产");
						}
						else{
							console.log("房产信息：目前您持有",sys.playerArr[i].house.length,"套房");
						}
						break;
					}
					case 4:{
						if(move(sys,i)){
							stopGame=true;
						}
						playing=false;
						break;
					}
					case 5:
						return 0;
				}
			}
		}
		else{
			move(sys,i,1);
		}
		if(stopGame){
			sys.playerArr.sort(function(a,b){
				return a.totalMoney-b.totalMoney;
			});
			console.log("\n排名如下↓");
			for(let i in sys.playerArr){
				if(sys.playerArr[i].totalMoney<0){
					console.log("第",i,"名：",sys.playerArr[i].name,"：破产");
				}
				else{
					console.log("第",i,"名：",sys.playerArr[i].name,"：",sys.playerArr[i].totalMoney);
				}
			}
			return 0;
		}
		if(sys.round%4==0){
			console.log("彩票开奖啦！");
			console.log("本期彩票的开奖号码为：",sys.lottery);
			if(sys.getLottery(i)){
				console.log("恭喜您中奖啦！奖金为：10000元");
			}
			else{
				console.log("很遗憾，这次没有中奖！");
			}
			sys.playerArr[i].lottery=-1;
		}
	}
	console.log("本回合结束！开始下一回合\n");
	return 1;
}
let onePlayer=function(sys){
	console.log("请输入玩家名：");
	let name = readline.question("");
	fuc.ProgressBar("正在创建角色","角色创建成功！");
	let player=new clas.Player(name,"[●]");
	console.log("欢迎你，",player.name,"你的棋子为：",player.piece);
	let computer=new clas.Player("电脑玩家","[○]");
	sys.playerArr.push(player);
	sys.playerArr.push(computer);
	chooseMode(sys);
	fuc.ProgressBar("正在加载游戏","加载成功！");
	do{
		sys.round++;
		if(sys.round%4==0){
			sys.lottery=Math.floor(Math.random()*10);
		}
	}while(playerOperation(sys));
}
let twoPlayer=function(sys){
	console.log("请输入玩家1 名：");
	let name1 = readline.question("");
	fuc.ProgressBar("正在创建角色","角色创建成功！");
	let player1=new clas.Player(name1,"[●]");
	console.log("欢迎你，",player1.name,"你的棋子为：",player1.piece);
	let judge=1,name2,player2;
	while(judge){
		console.log("请输入玩家2 名：");
		name2 = readline.question("");
		if(name2==name1){
			console.log("玩家名不能重复，请重新输入...");
		}
		else{
			fuc.ProgressBar("正在创建角色","角色创建成功！");
			player2=new clas.Player(name2,"[○]");
			console.log("欢迎你，",player2.name,"你的棋子为：",player2.piece);
			judge=0;
		}
	}
	sys.playerArr.push(player1);
	sys.playerArr.push(player2);
	chooseMode(sys);
	fuc.ProgressBar("正在加载游戏","加载成功！");
	do{
		sys.round++;
		if(sys.round%4==0){
			sys.lottery=Math.floor(Math.random()*10);
		}
	}while(playerOperation(sys));
}
let variablyPlayer=function(sys){
	let num = choose("请输入玩家人数（不超过5个）：",5);
	let pieceArr=["[●]","[○]","[◆]","[★]","[▲]"];
	for(let i = 1;i<=num;i++){
		console.log("请输入玩家",i," 名：");
		let name=readline.question("");
		let piece=pieceArr.splice(0,1);
		let player=new clas.Player(name,piece);
		fuc.ProgressBar("正在创建角色","角色创建成功！");
		console.log("欢迎你，",player.name,"你的棋子为：",player.piece);
		sys.playerArr.push(player);
	}
	for(let i =1;i<=5-num;i++){
		let computer=new clas.Player(`电脑玩家${i}`,pieceArr[i-1]);
		sys.playerArr.push(computer);
	}
	chooseMode(sys);
	fuc.ProgressBar("正在加载游戏","加载成功！");
	do{
		sys.round++;
		if(sys.round%4==0){
			sys.lottery=Math.floor(Math.random()*10);
		}
	}while(playerOperation(sys));
}
let main=function(){
	let doWork=true;
	while(doWork){
		let sys=new clas.Sys();
		switch(choose("欢迎你来到大富翁，请选择游戏模式：1.单人模式  2.双人模式  3.多人模式  4.退出",3)){
			case 1:
				onePlayer(sys);
				break;
			case 2:
				twoPlayer(sys);
				break;
			case 3:
				variablyPlayer(sys);
				// console.log("该模式研发中，敬请期待！");
				break;
			case 4:
				console.log("感谢您的使用~");
				doWork=false;
		}
	}
}
let readline=require("readline-sync");
let slog=require("single-line-log").stdout;
let clas=require("./class.js");//引入外部文件
let fuc=require("./function.js");//引入外部文件
main();