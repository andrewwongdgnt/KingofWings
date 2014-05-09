#pragma strict

var down:Sprite;
var up:Sprite;

var holdAnim:Animator;

function Start () {

}

function Update () {
	if (name=="btn_back" && Input.GetKeyDown(KeyCode.Escape)){
		GetComponent(SpriteRenderer).sprite = down;
						
	}
					
	if (Input.touchCount>0){

		
		var wp : Vector3 = Camera.main.ScreenToWorldPoint(Input.GetTouch(0).position);
		var touchPos : Vector2 = new Vector2(wp.x, wp.y);
		var hit_arr:Collider2D[] = Physics2D.OverlapPointAll(touchPos);
		for (col in hit_arr){
			if (col.gameObject==this.gameObject){
				if (Input.GetTouch(0).phase == TouchPhase.Began) {

				 	if (name=="btn_resetHighScore" ){
						holdAnim.SetBool("start",int.Parse(GameObject.Find("HighScore").guiText.text)>0);
					}
					if (name=="btn_globalHighScore" ){
						Application.LoadLevel("highscore");
						
					}
					if (name=="btn_back" ){
						Application.LoadLevel("game");
						
					}if (name=="btn_refresh" ){
						GameObject.Find("_HighScore Master").GetComponent(MyScoreBoard).refresh();
						
					}
					if (name=="btn_HSSwitch"){
						MyScoreBoard.isGlobalHS=!MyScoreBoard.isGlobalHS;
					}if (name=="btn_submitScore"){
						GameObject.Find("_HighScore Master").GetComponent(MyScoreBoard).submitScore();
						
					}
					GetComponent(SpriteRenderer).sprite = down;

				 }
				 else if (Input.GetTouch(0).phase == TouchPhase.Ended){
					 if (name=="btn_resetHighScore"){
						holdAnim.SetBool("start",false);
					}
				 	GetComponent(SpriteRenderer).sprite = up;
				 }
				 
			 }
		}
	}
	
	if (name=="btn_HSSwitch"){
		if (MyScoreBoard.isGlobalHS) GetComponent(SpriteRenderer).sprite = up;
		else GetComponent(SpriteRenderer).sprite = down;
	}
}

function holdEvent(){
	if (name=="btn_resetHighScore" ){
		GameMaster.highscore=0;
		holdAnim.SetBool("start",false);
		PlayerPrefs.SetInt("isHighScoreSubmitted",0);	
	}
}