package com.geotogetherapplication;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.arttitude360.reactnative.rngoogleplaces.RNGooglePlacesPackage;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.rctrevmob.RevMobPackage;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
import com.devfd.RNGeocoder.RNGeocoderPackage; // <--- import
import com.airbnb.android.react.maps.MapsPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.chirag.RNMail.*;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          SendSMSPackage.getInstance(),
            new RNFetchBlobPackage(),
            new RevMobPackage(),
            new RNExitAppPackage(),
            new RNGooglePlacesPackage(),
            new RNSendIntentPackage(),
            new RNMail(),
            new LinearGradientPackage(),
            new ImagePickerPackage(),
            new RNGoogleSigninPackage(),
              new FBSDKPackage(mCallbackManager),
              new RNGeocoderPackage(),
              new MapsPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
