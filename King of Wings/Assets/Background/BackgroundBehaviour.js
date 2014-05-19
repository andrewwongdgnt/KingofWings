#pragma strict

function Start () {

}

function FixedUpdate () {
		transform.rigidbody2D.velocity.x=GameMaster.gameSpeed*0.2;

}

function OnTriggerExit2D(colInfo : Collider2D){
	
	if (colInfo.gameObject.name=="Left"){
		Destroy (gameObject);

	}
	if (colInfo.gameObject.name=="Right"){
		var background = Instantiate(this, new Vector2(this.transform.position.x+this.renderer.bounds.size.x,-Camera.main.ScreenToWorldPoint (new Vector3(0f, Screen.height, 0f)).y), Quaternion.identity );
		background.gameObject.name=this.name;
	}


}