#pragma strict

var  uiCamera:Camera;

function Start () {

}

function Update () {

 	var sr = GetComponent(SpriteRenderer);
    if (sr == null) return;
 
    transform.localScale = Vector3(1,1,1);
 
    var width = sr.sprite.bounds.size.x;
    var height = sr.sprite.bounds.size.y;
 
    var worldScreenHeight = uiCamera.orthographicSize * 2.0;
    var worldScreenWidth = worldScreenHeight / Screen.height * Screen.width;
 
    transform.localScale.x = worldScreenWidth / width;
   	transform.localScale.y = worldScreenHeight / height;
 
}