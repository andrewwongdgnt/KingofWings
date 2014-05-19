#pragma strict

var prefab:GameObject;
function Start () {
	Instantiate(prefab, transform.position, Quaternion.identity).name = prefab.name;
	Destroy(gameObject);
}

function Update () {

}