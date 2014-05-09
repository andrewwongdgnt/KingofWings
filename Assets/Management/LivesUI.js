#pragma strict

var life : Sprite;
var death : Sprite;

static var  life_:Sprite;
static var death_ : Sprite;
function Start () {
life_ = life;
death_ = death;
}

function Update () {

}

static function refill(){
	for (var i:int = 1; i<=3; i++){
		GameObject.Find("Life "+i).GetComponent(SpriteRenderer).sprite = life_;
		GameObject.Find("Life "+i).GetComponent(SpriteRenderer).color.a = 1;
	}
}

static function die(i:int){
	GameObject.Find("Life "+i).GetComponent(SpriteRenderer).sprite = death_;
	GameObject.Find("Life "+i).GetComponent(SpriteRenderer).color.a = 0.65;
}