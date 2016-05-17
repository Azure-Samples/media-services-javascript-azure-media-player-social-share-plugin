---
services: media-services
platforms: javascript
author: 
---
# Media Services: Share Plugin for Azure Media Player


##Information
Attributions: 

#Introduction
This is an AMP plugin that enables the video viewer to share your content across multiple social networks. A "share" button has been added to the control bar and onclick, opens an overlayed share menu

 


## Getting Started
Include the plugin CSS/javascript*after* the AMP script in the `<head>` of your html page:

```<link href="amp-share.css" rel="stylesheet">```<br />
```<script src="amp-share.js"></script>```

See example.html for how to enable the plugin 
## Options
Options are set up directly before plugin initialization (see comments in example.html) 

The currently supported options are: Facebook status update, Twitter, Linkedin, and Email included like so:  
```var shareOption = new Amp.Plugin.Share.ShareOptions;```
                    ````shareOption.socialShare.shareIcons.push(Amp.Plugin.Share.SocialShareIcon.getPredefinedShareIcon(0 /* Facebook */));````
                    ```shareOption.socialShare.shareIcons.push(Amp.Plugin.Share.SocialShareIcon.getPredefinedShareIcon(1 /* Twitter */));```
                    ```shareOption.socialShare.shareIcons.push(Amp.Plugin.Share.SocialShareIcon.getPredefinedShareIcon(2 /* LinkedIn */));```
                   ``` shareOption.socialShare.shareIcons.push(Amp.Plugin.Share.SocialShareIcon.getPredefinedShareIcon(3 /* Mail */));```

Feel free to include them all (or just some) or write your own.

##To-Do
  