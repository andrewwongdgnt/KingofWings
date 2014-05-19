

public class AdsController extends MonoBehaviour {
    private static var s_Controller : AdsController;
    private static var jo:AndroidJavaObject;
    
    function Awake()
    {
        s_Controller = this;
        #if UNITY_ANDROID       
        jo = new AndroidJavaObject("com.example.GooglePlayPlugin.PlayAds");
        #endif
    }
}