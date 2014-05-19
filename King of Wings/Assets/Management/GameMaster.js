#pragma strict

static var badStateCheckInterval_start: float = 1;
static var badStateCheckInterval: float = badStateCheckInterval_start;

static var scoreInterval:float;
static var gameOver:boolean = true;

static var obstacleSpread_start:float = 8;
static var obstacleSpread_decrement:float = 1;
static var obstacleSpread_min:float = 4;
static var obstacleSpread:float = obstacleSpread_start;

static var spreadInterval_start: float = 20;
static var spreadInterval: float = spreadInterval_start;


static var gameSpeed_start:float=-7.0;
static var gameSpeed_increment:float=-.25;
static var gameSpeed_max:float=-25.0;
static var gameSpeed:float= gameSpeed_start;
private var gameSpeed_forPause:float;

static var speedInterval_start: float = 5;
static var speedInterval: float= speedInterval_start;

static var spikeInterval_start: float = 15;
static var spikeInterval: float= spikeInterval_start;

static var score:int=0;
static var highscore:int;

static var playerLives_start:int = 3;
static var playerLives:int = playerLives_start;

var topWall:BoxCollider2D;
var bottomWall:BoxCollider2D;
var leftWall:BoxCollider2D;
var rightWall:BoxCollider2D;

var screen : BoxCollider2D;

private var obstacleMaster:GameObject;

var background:GameObject;
var spike:GameObject;


var lives:GameObject;

var btn_resetHS:GameObject;
var btn_globalHS:GameObject;

var addedScore:GameObject;
private var scoreMap = new Hashtable();


private var score_GameObject:GameObject;
private var highScore_GameObject:GameObject;
private var tiltArrows_GameObject:GameObject;
private var tiltText_GameObject:GameObject;
private var newRecord_GameObject:GameObject;
private var restartX2Text_GameObject:GameObject;
private var restartX1Text_GameObject:GameObject;
private var restartCount:int;

static var isTimerBoostFinished:boolean = true;
function Start () {

	scoreMap["Crown"] = 100;
	scoreMap["Big Crown"] = 500;
	scoreMap["Timer Up"] = 500;
	scoreMap["Timer Down"] = 250;

	score_GameObject = GameObject.Find("Score");
	highScore_GameObject = GameObject.Find("HighScore");
	tiltArrows_GameObject = GameObject.Find("TiltArrows");
	tiltText_GameObject = GameObject.Find("TiltText");
	newRecord_GameObject = GameObject.Find("NewRecord");
	restartX2Text_GameObject = GameObject.Find("TouchToRestart_x2");
	restartX1Text_GameObject = GameObject.Find("TouchToRestart_x1");

	restartCount = 2;

	highscore=PlayerPrefs.GetInt("MyHighscore")	;
	if (highscore==null) highscore=0;

/*
-----------------
	Background
----------------
*/

	var length:int = (Camera.main.ScreenToWorldPoint (new Vector3(Screen.width, 0f, 0f)).x*2)/background.renderer.bounds.size.x+1;
	var initialX:float = -Camera.main.ScreenToWorldPoint (new Vector3(Screen.width, 0f, 0f)).x;
	for (var i:int = 0; i<length; i++){
		var first_background:GameObject = Instantiate(background, new Vector2(initialX, -Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y), Quaternion.identity );
		first_background.name = background.name;
		initialX = first_background.transform.position.x+first_background.renderer.bounds.size.x;
	}



	boundary();
	
/*
-----------------
	Spawn obstacles
----------------
*/
	obstacleMaster = GameObject.Find("_Obstacle Master");

}


function Update () {

	boundary();
	if (Input.GetKeyDown(KeyCode.Escape) && gameOver) { Application.Quit(); }

/*
-----------------
	Level Pacing
----------------
*/

	highScore_GameObject.guiText.text = highscore+"";
	//save highscore
	PlayerPrefs.SetInt("MyHighscore",highscore);
	if (!gameOver){
		scoreInterval -= Time.deltaTime;
		if (scoreInterval<=0){
			scoreInterval=.04;
			score++;
		}
		
		score_GameObject.guiText.text=score+"";
		if (score_GameObject.guiText.fontSize>50){
			score_GameObject.guiText.fontSize-=Time.deltaTime*3;
		} else {
			score_GameObject.guiText.fontSize=50;
		}
		
		if (score>highscore){
			highscore=score;			
			PlayerPrefs.SetInt("isHighScoreSubmitted",0);
		}
		tiltArrows_GameObject.GetComponent(SpriteRenderer).enabled=false;
		tiltText_GameObject.GetComponent(SpriteRenderer).enabled=false;
		
		spreadInterval -= Time.deltaTime;
		if (spreadInterval<=0){
			spreadInterval=spreadInterval_start;
			obstacleSpread=Mathf.Max(obstacleSpread_min, obstacleSpread-obstacleSpread_decrement);
		}
		speedInterval -= Time.deltaTime;
		if (speedInterval<=0){
			speedInterval=speedInterval_start;
			gameSpeed=Mathf.Max(gameSpeed_max, gameSpeed+gameSpeed_increment);
		}
		
		spikeInterval -= Time.deltaTime;
		if (spikeInterval<=0 && spikeInterval>-999){
			//-999 to prevent spamming of spikes
			
			Instantiate(spike, new Vector2(rightWall.center.x - rightWall.size.x/2, Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y), Quaternion.identity ).gameObject.name = spike.name;

			ObstacleMaster.obstacleCount=3;
			spikeInterval=-1000;
		}
		newRecord_GameObject.guiText.text="";
		
		KillYourself();

	} else  {
		
		score_GameObject.guiText.text=score+"";
		score_GameObject.guiText.fontSize=50;
		tiltArrows_GameObject.GetComponent(SpriteRenderer).enabled=true;
		tiltText_GameObject.GetComponent(SpriteRenderer).enabled=true;
		restartX2Text_GameObject.GetComponent(SpriteRenderer).enabled=false;
		restartX1Text_GameObject.GetComponent(SpriteRenderer).enabled=false;
		
		var obstacle_arr = GameObject.FindGameObjectsWithTag ("Obstacle");
		for (var obstacle:GameObject in obstacle_arr){
			Destroy(obstacle);
		}
		var collectable_arr = GameObject.FindGameObjectsWithTag ("Collectable");
		for (var collectable:GameObject in collectable_arr){
			Destroy(collectable);
		}
		var spike_arr = GameObject.FindGameObjectsWithTag ("Spike");
		for (var spike:GameObject in spike_arr){
			Destroy(spike);
		}
		gameSpeed = gameSpeed_start;
		
		
		if (highscore==score && highscore>0){
					newRecord_GameObject.guiText.text="New Record!";
		} else {
					newRecord_GameObject.guiText.text="";

		}
			
		
		startGame();

		
	}
	
	btn_resetHS.renderer.enabled = gameOver;
	btn_resetHS.collider2D.enabled = gameOver;
	
	
	btn_globalHS.renderer.enabled = gameOver;
	btn_globalHS.collider2D.enabled = gameOver;
	
/*
-----------------
	Check if no obstacles spawned
----------------
*/	
	badStateCheckInterval -= Time.deltaTime;
	if (badStateCheckInterval<=0){
		badStateCheckInterval=badStateCheckInterval_start;
		var _arr = GameObject.FindGameObjectsWithTag("Obstacle");
		if (_arr.length==0){
			obstacleMaster.GetComponent(ObstacleMaster).SpawnObstacle(0, rightWall.center.x - rightWall.size.x/2);

		}
	}
	
	
	
}

function startGame(){
	if (Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began){
		
		var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.GetTouch(0).position);
		var touchPos : Vector2 = new Vector2(wp.x, wp.y);
		var hit_arr:Collider2D[] = Physics2D.OverlapPointAll(touchPos);
		
		var allowStart:boolean = true;

		for (col in hit_arr){
			if (col.gameObject==btn_resetHS || col.gameObject==btn_globalHS){
				
				allowStart=false;	
				break;			 
			}
			
		}
		
		if (allowStart && isTimerBoostFinished){
			gameOver=false;
			score=0;
			obstacleSpread=obstacleSpread_start;
			
			ObstacleMaster.mountainType=1;
			ObstacleMaster.obstacleCount=2;
			spikeInterval=spikeInterval_start;
			playerLives=playerLives_start;
			obstacleMaster.GetComponent(ObstacleMaster).SpawnObstacle(0, rightWall.center.x - rightWall.size.x/2);
			LivesUI.refill();
			
			restartX2Text_GameObject.GetComponent(SpriteRenderer).enabled=true;
		
			try {
				AdMobPlugin.HideBannerView();
			} catch (e){

			}
		
		}
		
	}
}
	
	
function KillYourself(){
	if (Input.touchCount>0 && Input.GetTouch(0).phase == TouchPhase.Began){
		
		restartCount--;
		if (restartCount==1) {
		
			restartX2Text_GameObject.GetComponent(SpriteRenderer).enabled=false;
			restartX1Text_GameObject.GetComponent(SpriteRenderer).enabled=true;
		}
		if (restartCount==0){
		
			restartX2Text_GameObject.GetComponent(SpriteRenderer).enabled=false;
			restartX1Text_GameObject.GetComponent(SpriteRenderer).enabled=false;
			restartCount=2;
			
			
			
			gameOver=true;
			try {
				AdMobPlugin.ShowBannerView();
			} catch (e){
				
			}
		}
	
		
	}
}



/*
-----------------
	Boundary
----------------
*/

function boundary(){

	//Move each wall to its edge location:
	topWall.size = new Vector2(Camera.main.ScreenToWorldPoint(new Vector3(Screen.width * 2f, 0f, 0f)).x, 2f);
	topWall.center = new Vector2(0f, Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y+1f);
	
	bottomWall.size = new Vector2(Camera.main.ScreenToWorldPoint(new Vector3(Screen.width * 2f, 0f, 0f)).x, 2f);
	bottomWall.center = new Vector2(0f, Camera.main.ScreenToWorldPoint (new Vector3(0f, 0f, 0f)).y-1f);
	
	leftWall.size = new Vector2(2f, Camera.main.ScreenToWorldPoint(new Vector3(0f, Screen.height* 3f, 0f)).y);
	leftWall.center = new Vector2(Camera.main.ScreenToWorldPoint (new Vector3(0f, 0f, 0f)).x-1f,0f);
	
	rightWall.size = new Vector2(2f, Camera.main.ScreenToWorldPoint(new Vector3(0f,Screen.height * 3f, 0f)).y);
	rightWall.center = new Vector2(Camera.main.ScreenToWorldPoint (new Vector3(Screen.width, 0f, 0f)).x+1f,0f);
	
	screen.size = new Vector2(Camera.main.ScreenToWorldPoint(new Vector3(Screen.width * 2f, 0f, 0f)).x, Camera.main.ScreenToWorldPoint(new Vector3(0f,Screen.height * 2f, 0f)).y);
	screen.center = new Vector2(0f,0f);

	handleLivesUI();
	handleLeftButtons();
	handleRightButtons();
}

/*
-----------------
	Player Lives
----------------
*/
static function playerHit(){
	
	if (playerLives>0 && !PlayerBehaviour.isHit && !PlayerBehaviour.isFlashing){
		
		PlayerBehaviour.isHit=true;
		PlayerBehaviour.flashInterval=0;
		LivesUI.die(playerLives);
		
		playerLives--;
		
		
		
		if (playerLives==0)	{
			gameOver=true;
			try {
				AdMobPlugin.ShowBannerView();
			} catch (e){
				
			}
			
		}
	}
}

function handleLivesUI(){
	lives.transform.position.x=Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, -1f)).x+1.7;
		lives.transform.position.y=Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, -1f)).y-.7;

	
}

/*
-------------------------------
        Buttons
----------------
*/

function handleLeftButtons(){
	var myX = Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, -1f)).x+btn_resetHS.renderer.bounds.size.x/2 + Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2, Screen.height, -1f)).x-btn_resetHS.renderer.bounds.size.x/2-3;
	myX *= .5;
	btn_resetHS.transform.position.x=myX;
	
	
}

function handleRightButtons(){
	var myX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, Screen.height, -1f)).x-btn_resetHS.renderer.bounds.size.x/2 + Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2, Screen.height, -1f)).x+btn_resetHS.renderer.bounds.size.x/2+3;
	myX *= .5;
	btn_globalHS.transform.position.x=myX;
	
	
}

/*
-----------------
	Crowns
----------------
*/
static var crownCount:int=0;

static function increaseCrownCount(crownType:String){
	if (crownType=="Crown"){
		crownCount++;
	}
	else if (crownType=="Big Crown"){
		crownCount+=5;
		
	}
}

/*
-----------------
	Timers
----------------
*/

static var timerUp_boost = -10;
static var timerUp_count = 0;

static var timerDown_drag = 5;
static var timerDown_count = 0;

static function handleTimer(timerType:String){
	
	isTimerBoostFinished=false;
	if (timerType=="Timer Up"){

		if (timerUp_count==0)
			gameSpeed+=timerUp_boost;
		timerUp_count++;
			
	}
	else if (timerType=="Timer Down"){
		if (timerDown_count==0)
			gameSpeed+=timerDown_drag;
		timerDown_count++;
		
	}
	
	var gameMaster:GameObject = GameObject.Find("_Game Master");
	gameMaster.SendMessage ("handleTimerReset", timerType);
}

function handleTimerReset(timerType:String){
	
	
	if (timerType=="Timer Up"){
		yield WaitForSeconds (1);
		timerUp_count--;
		if (timerUp_count==0){
			gameSpeed-=timerUp_boost;
			isTimerBoostFinished=true;
		}
	}
	if (timerType=="Timer Down"){
		yield WaitForSeconds (2);
		timerDown_count--;
		if (timerDown_count==0){
			gameSpeed-=timerDown_drag;
			isTimerBoostFinished=true;	
		}
	}
}

function spawnAddedScore(collectableType:String){
	var pos:Vector3 = new Vector3(Camera.main.ScreenToWorldPoint (new Vector3(Screen.width, 0f, 0f)).x-2f,Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y-2f,-5);
	var newAddedScore = Instantiate(addedScore, pos, Quaternion.identity);
	
	if (!gameOver){
		var s:int  = scoreMap[collectableType];
		score+=s;

		newAddedScore.GetComponent(TextMesh).text = "+"+s;
		newAddedScore.transform.position.x+=Random.Range(0,-1.1);
	
	score_GameObject.guiText.fontSize=65;
	}
}
/*
-----------------
	Pause and Resume
----------------
*/

function OnApplicationPause(pauseStatus: boolean) {
		if (pauseStatus){
			gameSpeed_forPause = gameSpeed;
			gameSpeed = 0;
		} else {
			gameSpeed=gameSpeed_forPause;
		}
		
	}
	
function 	OnApplicationFocus(focus : boolean) {
	}


