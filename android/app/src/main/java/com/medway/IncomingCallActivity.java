package com.medway;

import android.content.Context;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.PowerManager;
import android.os.Vibrator;
import android.support.annotation.Nullable;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageButton;
import android.widget.TextView;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.medway.voip.CurrentNotificationDataHolder;

public class IncomingCallActivity extends ReactActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock wakeLock = pm.newWakeLock(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON, "Medway InCall");
        wakeLock.acquire();
        this.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN
                        | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                        | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                        | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD,
                WindowManager.LayoutParams.FLAG_FULLSCREEN
                        | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED
                        | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON
                        | WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD);
        setContentView(R.layout.activity_incoming_call);
        final ImageButton callAccept = (ImageButton) findViewById(R.id.callAccept);
        final ImageButton callDecline = (ImageButton) findViewById(R.id.callDecline);
        Uri uri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE);
        final Ringtone ringtone = RingtoneManager.getRingtone(this.getApplicationContext(), uri);
        ringtone.play();

        final Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        vibrator.vibrate(10000);


        callAccept.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {
                findViewById(R.id.spinner).setVisibility(View.VISIBLE);
                ((TextView) findViewById(R.id.textIndicator)).setText("CONFIGURATION DE L'APPEL");

                ringtone.stop();
                vibrator.cancel();
                Thread thread = new Thread(){
                    @Override public void run(){
                        try { synchronized(this) { wait(3000); } } catch(InterruptedException ex){}
                        WritableMap params = Arguments.createMap();
//                params.putString("NotificationInfo", getIntent().getStringExtra("NotificationInfo"));
                        params.putString("NotificationInfo", CurrentNotificationDataHolder.data);
                        sendEvent("NativeAndroid_CallAccept", params);
                        CurrentNotificationDataHolder.data = null;
                        finish();
                    }
                };
                thread.start();

            }
        });

        callDecline.setOnClickListener(new View.OnClickListener() {
            @Override public void onClick(View v) {
                ringtone.stop();
                vibrator.cancel();
                Thread thread = new Thread(){
                @Override public void run(){
                    try { synchronized(this) { wait(10); } } catch(InterruptedException ex){}
                        WritableMap params = Arguments.createMap();
                        sendEvent("NativeAndroid_CallDecline", params);
                        CurrentNotificationDataHolder.data = null;
                        finish();
                    }
                };
                thread.start();
            }
        });

    }

    private void sendEvent(String eventName, @Nullable WritableMap params) {
        getReactInstanceManager().getCurrentReactContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}
