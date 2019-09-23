package com.richtech.myoutube;

import android.app.Application;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactApplication;
//import com.azendoo.reactnativesnackbar.SnackbarPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.airship.customwebview.CustomWebViewPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.react.rnspinkit.RNSpinkitPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.sbugert.rnadmob.RNAdMobPackage;
import net.zubricky.AndroidKeyboardAdjust.AndroidKeyboardAdjustPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  
  

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
         new VectorIconsPackage(),
          new RNAdMobPackage(),
          new CustomWebViewPackage(),
        new FastImageViewPackage(),
        new AndroidKeyboardAdjustPackage(),
        new SplashScreenReactPackage(),  
        new RNSpinkitPackage()

      );
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
    SoLoader.init(this, /* native exopackage */ false);
  }
}
