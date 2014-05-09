#pragma strict

function Start () {
	renderer.enabled = true;
}

function Update () {

}

function FixedUpdate () {
	transform.rigidbody2D.velocity.x=GameMaster.gameSpeed;
}

function  OnTriggerEnter2D(colInfo : Collider2D){
	if (colInfo.gameObject.name=="Player"){

		GameMaster.playerHit();
	}
	
	if (colInfo.gameObject.name.IndexOf("Spikes")>=0){
		renderer.enabled = false;
	}

}

function setSpikeTrigger(){
	//anim.SetBool("Down", true);
}

function resetSpike(){
	//anim.SetBool("Down", false);
}

function OnTriggerExit2D(colInfo : Collider2D){
	
	if (colInfo.gameObject.name=="Left"){
		Destroy (gameObject);

	}
	if (colInfo.gameObject.name=="Right"){
	
	
		
		var currentPosX = transform.position.x + renderer.bounds.size.x;
		Instantiate(gameObject, new Vector2(currentPosX, transform.position.y), Quaternion.identity ).name = gameObject.name;

	}


}