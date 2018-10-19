package com.medway.voip;

import android.content.Context;
import android.content.Intent;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

public class PusherReceiver extends WakefulBroadcastReceiver {

    public void onReceive(final Context context, Intent intent) {
        String custom = intent.getStringExtra("custom");
        try {
            JSONObject notificationData = new JSONObject(custom);
            JSONObject customNotificationData = notificationData.getJSONObject("a");
            Intent service = new Intent(context, BackgroundService.class);
            if (customNotificationData.getString("type").equals("incoming_call")) {
//                service.putExtra("NotificationInfo", customNotificationData.toString());
                CurrentNotificationDataHolder.data = customNotificationData.toString();
                startWakefulService(context, service);
            }
        } catch (JSONException e) {
            e.printStackTrace();
            Log.d("MEDWAY", "ERROR");
        }
    }
}
