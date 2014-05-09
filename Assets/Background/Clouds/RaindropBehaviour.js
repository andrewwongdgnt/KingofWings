#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerExit2D(colInfo : Collider2D){
	
	if (colInfo.gameObject.name=="Bottom"){
		Destroy (gameObject);

	}
}