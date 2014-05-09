using UnityEngine;
using System;

// Example script showing how you can easily call into the AdMobPlugin.
public class AdMobPluginDemoScript : MonoBehaviour {

	public  static Boolean allowAds=true;
    void Start()
    {
		try{
			if (allowAds){
				print("Started");
				AdMobPlugin.CreateBannerView("ca-app-pub-5102038243868958/5889446821",
	                                     AdMobPlugin.AdSize.SmartBanner,
	                                     false);
		        print("Created Banner View");
		        AdMobPlugin.RequestBannerAd(false);
		        print("Requested Banner Ad");
				allowAds=false;
			}
		} catch(Exception e){

		}
    }

    void OnEnable()
    {
		print("Registering for AdMob Events");
        AdMobPlugin.ReceivedAd += HandleReceivedAd;
        AdMobPlugin.FailedToReceiveAd += HandleFailedToReceiveAd;
        AdMobPlugin.ShowingOverlay += HandleShowingOverlay;
        AdMobPlugin.DismissedOverlay += HandleDismissedOverlay;
        AdMobPlugin.LeavingApplication += HandleLeavingApplication;
    }

    void OnDisable()
    {
        print("Unregistering for AdMob Events");
		AdMobPlugin.ReceivedAd -= HandleReceivedAd;
        AdMobPlugin.FailedToReceiveAd -= HandleFailedToReceiveAd;
        AdMobPlugin.ShowingOverlay -= HandleShowingOverlay;
        AdMobPlugin.DismissedOverlay -= HandleDismissedOverlay;
        AdMobPlugin.LeavingApplication -= HandleLeavingApplication;
    }

    public void HandleReceivedAd()
    {
        print("HandleReceivedAd event received");
    }

    public void HandleFailedToReceiveAd(string message)
    {
        print("HandleFailedToReceiveAd event received with message:");
        print(message);
    }

    public void HandleShowingOverlay()
    {
        print("HandleShowingOverlay event received");
    }

    public void HandleDismissedOverlay()
    {
        print("HandleDismissedOverlay event received");
    }

    public void HandleLeavingApplication()
    {
        print("HandleLeavingApplication event received");
    }
}