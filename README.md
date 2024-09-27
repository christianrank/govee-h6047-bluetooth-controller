# govee-h6047-bluetooth-controller

Small and simple script that can do one thing: Put my Govee H6047 Light Bars (and the linked Govee H61A0 LED Strip) into Music DreamView mode with aux input.

Hacked together in 3h because the app somehow stopped working for this use-case after an update that dropped the headphone music input button (by mistake I guess).

# I want to use this too, what do I have to do?
1. Start it (`yarn start`)
2. Check for the uuid of your Govee_H6047_322A device and put it in the .env (`GOVEE_H6047_UUID=YOUR_UUID`)
3. Start it again, done

# Resources
- https://www.apkmirror.com/apk/govee/govee-home/govee-home-6-2-40-release/  
  (feature is still working on this version, so I used it for reverse engineering)
- https://www.youtube.com/watch?v=NIBmiPtCDdM
- https://github.com/bwp91/homebridge-govee
