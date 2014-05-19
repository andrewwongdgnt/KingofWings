#pragma strict

static var start: float = 5;
static var interval: float = start;

var rainDrop_arr:GameObject[];

function Start () {

}

function Update () {

	interval -= Time.deltaTime;
	if (interval<=0){
		interval = start;

		var ran = Random.Range(0, rainDrop_arr.Length);
		
		var rainDrop:GameObject = Instantiate(rainDrop_arr[ran], transform.position, Quaternion.identity);

		rainDrop.transform.localScale.x = transform.localScale.x*0.5;
		rainDrop.transform.localScale.y = transform.localScale.y*0.5;
		
		rainDrop.transform.position.z+=0.001;
	}
}

function OnTriggerExit2D(colInfo : Collider2D){
	
	if (colInfo.gameObject.name=="Left"){
		Destroy (gameObject);

	}
}