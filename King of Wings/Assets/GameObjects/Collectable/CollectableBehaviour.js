#pragma strict

var anim:Animator;
var myAudio:AudioSource;

function Start () {

}

function Update () {

}

function FixedUpdate () {
	if (rigidbody2D!=null){
	rigidbody2D.velocity.x=GameMaster.gameSpeed;
	}
}

function OnTriggerEnter2D(colInfo : Collider2D){
	if (colInfo.gameObject.name=="Player"){
		
		collider2D.enabled = false;	
		anim.SetTrigger("capture");
		if (gameObject.name=="Crown" || gameObject.name=="Big Crown"){
			GameMaster.increaseCrownCount(gameObject.name);
			
		}
		else if (gameObject.name=="Timer Up" || gameObject.name=="Timer Down"){
			GameMaster.handleTimer(gameObject.name);
		}
		if (myAudio!=null) myAudio.Play();
		
		GameObject.Find("_Game Master").GetComponent(GameMaster).spawnAddedScore(name);
	}
}

function DestroyMe(){

	Destroy (gameObject);
}
