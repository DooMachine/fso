#!/bin/bash
function publishMain { 
    cd fso.Api;
    dotnet publish -o publish -c Release
 }
 function publishEventBus { 
    cd ../fso.EventBusListener;
    dotnet publish -o publish -c Release
 }
 function publishNotificationApi { 
    cd ../fso.NotificationApi;
    dotnet publish -o publish -c Release
 }
 function publishNotificationBusListener { 
    cd ../fso.NotificationBusListener;
    dotnet publish -o publish -c Release
 }
 function publishIdentityProvider { 
    cd ../fso.IdentityProvider;
    dotnet publish -o publish -c Release
 }
 function publishIdentityBusListener { 
    cd ../fso.IdentityBusListener;
    dotnet publish -o publish -c Release
 }
 function publishAppMediaProvider { 
    cd ../fso.AppMediaProvider;
    dotnet publish -o publish -c Release
 }
 publishMain
 publishEventBus
 publishNotificationApi
 publishNotificationBusListener
 publishIdentityProvider
 publishIdentityBusListener
 publishAppMediaProvider