#pragma strict


var btn_back:GameObject;
var btn_submitScore:GameObject;


var btn_HSSwitch:GameObject;
var btn_Refresh:GameObject;

var bigCrown:GameObject;
var crown:GameObject;

var textfield_background:GameObject;


private var playerName : String;
private var crownYPos:float;
function Start () {

	playerName = PlayerPrefs.GetString("playerName");
	if (playerName==null || playerName.Trim().Length==0){
		playerName="<name>";
	}

	crownYPos=crown.transform.position.y;
}

function Update () {


	
	if (Input.GetKeyDown(KeyCode.Escape)) { Application.LoadLevel("game"); }
	
	
	var myX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2, 0f, 0f)).x-6.5f;
	btn_back.transform.position.x=btn_HSSwitch.transform.position.x=btn_Refresh.transform.position.x=myX;
	if (!MyScoreBoard.onSuccess){
		btn_back.transform.position.x+=4;
		btn_Refresh.transform.position.x+=9;
	}
	
	myX = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2, 0f, 0f)).x+6f;
	btn_submitScore.transform.position.x=myX;
	
	var isHighScoreSubmitted:int = PlayerPrefs.GetInt("isHighScoreSubmitted");
	if ((isHighScoreSubmitted==null || isHighScoreSubmitted==0) && PlayerPrefs.GetInt("MyHighscore")>0){
		btn_submitScore.collider2D.enabled=true;
		btn_submitScore.GetComponent(SpriteRenderer).color.a=1;
	} else {
		btn_submitScore.collider2D.enabled=false;
		btn_submitScore.GetComponent(SpriteRenderer).color.a=0.5;
	}
	
	btn_submitScore.renderer.enabled =  btn_HSSwitch.renderer.enabled =  btn_HSSwitch.collider2D.enabled = MyScoreBoard.onSuccess;
	btn_Refresh.renderer.enabled = btn_Refresh.collider2D.enabled = !MyScoreBoard.onSuccess;
	
	bigCrown.transform.position.x = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width/2, 0f, 0f)).x-3.8f;
	crown.transform.position.x = bigCrown.transform.position.x;
	bigCrown.renderer.enabled =crown.renderer.enabled= (MyScoreBoard.isGlobalHS || MyScoreBoard.myRank<=5) && MyScoreBoard.onSuccess;
	
	if (!MyScoreBoard.isGlobalHS && MyScoreBoard.myRank==6){
		crown.renderer.enabled = true;
		
		crown.transform.position.y = bigCrown.transform.position.y;
	} else {
		crown.transform.position.y = crownYPos;
	}
	
	
	
	

}
var guiStyle:GUIStyle;
function OnGUI(){
	GUI.SetNextControlName("Text1");
	var y;
	var x;
	if (MyScoreBoard.onSuccess){
		y = Camera.main.WorldToScreenPoint(new Vector3(0f, textfield_background.transform.position.y-.7, 0f)).y;
		x = Camera.main.WorldToScreenPoint (new Vector3(textfield_background.transform.position.x, 0f, 0f)).x;
	} else {
		y=999;
		x=999;
	}
	playerName = GUI.TextField (Rect (x, y, 200, 30), playerName, 7,guiStyle);
	PlayerPrefs.SetString("playerName", playerName);
	GUI.skin.settings.cursorColor = Color.black;
	if (GUI.GetNameOfFocusedControl() == "") {
    	GUI.FocusControl ("Text1");

	}
	
}

	
