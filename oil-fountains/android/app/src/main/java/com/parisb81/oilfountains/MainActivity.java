package com.parisb81.oilfountains;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Make WebView background transparent
        WebView webView = getBridge().getWebView();
        webView.setBackgroundColor(0x00000000); // Fully transparent
        webView.setLayerType(WebView.LAYER_TYPE_SOFTWARE, null);
    }
}
