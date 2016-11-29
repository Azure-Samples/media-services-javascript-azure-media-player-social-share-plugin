

var Amp;
(function (Amp) {
    var Plugin;
    (function (Plugin) {
        var Share;
        (function (Share) {
            function getCurrentPageUrl() {
                var isInIframe = (parent !== window);
                var parentUrl = window.location.href;
                if (isInIframe) {
                    if (!document.referrer) {
                        Share.defaultMessageLoggerMethod("unable to get the referrer url", false);
                    }
                    parentUrl = document.referrer;
                }
                return parentUrl;
            }
            Share.getCurrentPageUrl = getCurrentPageUrl;
            function defaultMessageLoggerMethod(msg, isError) {
                console.log(msg);
            }
            Share.defaultMessageLoggerMethod = defaultMessageLoggerMethod;
            ;
            var ClipBoardHelper = (function () {
                function ClipBoardHelper() {
                }
                ClipBoardHelper.tryCopyTextToClipboard = function (textArea, text) {
                    textArea.value = text;
                    textArea.select();
                    try {
                        if (document.execCommand("copy")) {
                            Share.defaultMessageLoggerMethod("AmpShare.copytextsuccess", false);
                            //add toast to show link's been copied
                        }
                        else {
                            Share.defaultMessageLoggerMethod("AmpShare.copytextfail", false);
                        }
                    }
                    catch (err) {
                        Share.defaultMessageLoggerMethod("AmpShare.copytextfailWithException:" + err.message, true);
                    }
                    ;
                };
                return ClipBoardHelper;
            })();
            Share.ClipBoardHelper = ClipBoardHelper;
            var SocialShareOnlineChecker = (function () {
                function SocialShareOnlineChecker() {
                }
                SocialShareOnlineChecker.isSocialShareOnline = function (socialShareCheckingUrl, ifOnline, ifOffline) {
                    for (var i = 0; i < SocialShareOnlineChecker.checkingHistories.length; i++) {
                        var checkingHistory = SocialShareOnlineChecker.checkingHistories[i];
                        if (checkingHistory.url !== socialShareCheckingUrl) {
                            continue;
                        }
                        // find a url checked before
                        if (typeof (checkingHistory.isOnline) === "boolean") {
                            // already got the result
                            if (checkingHistory.isOnline) {
                                ifOnline();
                            }
                            else {
                                ifOffline();
                            }
                        }
                        else {
                            // not get the result yet;
                            checkingHistory.scriptElement.addEventListener("load", function (ev) {
                                ifOnline();
                            });
                            checkingHistory.scriptElement.addEventListener("error", function (ev) {
                                ifOffline();
                            });
                        }
                        return;
                    }
                    //we didn't check this url before.
                    var script = document.createElement("script");
                    var newCheckingHistory = { url: socialShareCheckingUrl, scriptElement: script, isOnline: undefined };
                    script.type = "text/javascript";
                    script.src = socialShareCheckingUrl;
                    script.addEventListener("load", function (ev) {
                        newCheckingHistory.isOnline = true;
                        ifOnline();
                    });
                    script.addEventListener("error", function (ev) {
                        newCheckingHistory.isOnline = false;
                        ifOffline();
                    });
                    SocialShareOnlineChecker.checkingHistories.push(newCheckingHistory);
                    document.body.appendChild(script);
                };
                SocialShareOnlineChecker.checkingHistories = [];
                return SocialShareOnlineChecker;
            })();
            Share.SocialShareOnlineChecker = SocialShareOnlineChecker;
        })(Share = Plugin.Share || (Plugin.Share = {}));
    })(Plugin = Amp.Plugin || (Amp.Plugin = {}));
})(Amp || (Amp = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Amp;
(function (Amp) {
    var Plugin;
    (function (Plugin) {
        var Share;
        (function (Share) {
            (function (SocialShareType) {
                SocialShareType[SocialShareType["Facebook"] = 0] = "Facebook";
                SocialShareType[SocialShareType["Twitter"] = 1] = "Twitter";
                SocialShareType[SocialShareType["LinkedIn"] = 2] = "LinkedIn";
                SocialShareType[SocialShareType["Mail"] = 3] = "Mail";
                SocialShareType[SocialShareType["Customized"] = 4] = "Customized";
            })(Share.SocialShareType || (Share.SocialShareType = {}));
            var SocialShareType = Share.SocialShareType;
            var ShareOptionBase = (function () {
                function ShareOptionBase() {
                    this.isEnable = true;
                }
                return ShareOptionBase;
            })();
            Share.ShareOptionBase = ShareOptionBase;
            var SocialShareOption = (function (_super) {
                __extends(SocialShareOption, _super);
                function SocialShareOption() {
                    _super.apply(this, arguments);
                    this.shareIcons = [];
                }
                return SocialShareOption;
            })(ShareOptionBase);
            Share.SocialShareOption = SocialShareOption;
            var SocialShareIcon = (function () {
                function SocialShareIcon(shareType, iconUrl, url, validationUrl, telemetryAlias) {
                    if (shareType === void 0) { shareType = 4 /* Customized */; }
                    if (iconUrl === void 0) { iconUrl = ""; }
                    if (url === void 0) { url = ""; }
                    if (validationUrl === void 0) { validationUrl = ""; }
                    if (telemetryAlias === void 0) { telemetryAlias = ""; }
                    this.shareType = shareType;
                    this.iconUrl = iconUrl;
                    this.url = url;
                    this.validationUrl = validationUrl;
                    this.telemetryAlias = telemetryAlias;
                }
                SocialShareIcon.getPredefinedShareIcon = function (shareType) {
                    var returnValue = new SocialShareIcon();
                    returnValue.shareType = shareType;
                    var encodedPageUrl = encodeURIComponent(Share.getCurrentPageUrl());
                    switch (shareType) {
                        case 0 /* Facebook */:
                            returnValue.iconUrl = "data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2032%2032%22%20enable-background%3D%22new%200%200%2032%2032%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%3Cpath%20id%3D%22Blue_3_%22%20fill%3D%22%233B5998%22%20d%3D%22M30.2%2C32c1%2C0%2C1.8-0.8%2C1.8-1.8V1.8c0-1-0.8-1.8-1.8-1.8H1.8C0.8%2C0%2C0%2C0.8%2C0%2C1.8v28.5%2Cc0%2C1%2C0.8%2C1.8%2C1.8%2C1.8H30.2z%22%2F%3E%3Cpath%20id%3D%22f_3_%22%20fill%3D%22%23FFFFFF%22%20d%3D%22M22.1%2C32V19.6h4.2l0.6-4.8h-4.8v-3.1c0-1.4%2C0.4-2.4%2C2.4-2.4l2.6%2C0V5c-0.4-0.1-2-0.2-3.7-0.2%2Cc-3.7%2C0-6.2%2C2.3-6.2%2C6.4v3.6h-4.2v4.8h4.2V32H22.1z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                            returnValue.url = "//www.facebook.com/share.php?u=" + encodedPageUrl;
                            returnValue.validationUrl = "//connect.facebook.net/en_US/sdk.js";
                            break;
                        case 2 /* LinkedIn */:
                            returnValue.iconUrl = "data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2032%2032%22%20enable-background%3D%22new%200%200%2032%2032%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%3Cpath%20fill%3D%22%230077B5%22%20d%3D%22M29.6%2C0H2.4C1.1%2C0%2C0%2C1%2C0%2C2.3v27.4C0%2C31%2C1.1%2C32%2C2.4%2C32h27.3c1.3%2C0%2C2.4-1%2C2.4-2.3V2.3C32%2C1%2C30.9%2C0%2C29.6%2C0z%22%2F%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M4.7%2C12h4.7v15.3H4.7V12z%20M7.1%2C4.4c1.5%2C0%2C2.8%2C1.2%2C2.8%2C2.8c0%2C1.5-1.2%2C2.8-2.8%2C2.8c-1.5%2C0-2.8-1.2-2.8-2.8%2CC4.4%2C5.6%2C5.6%2C4.4%2C7.1%2C4.4%22%2F%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M12.5%2C12H17v2.1h0.1c0.6-1.2%2C2.2-2.5%2C4.5-2.5c4.8%2C0%2C5.7%2C3.2%2C5.7%2C7.3v8.4h-4.7v-7.4c0-1.8%2C0-4-2.5-4%2Cc-2.5%2C0-2.8%2C1.9-2.8%2C3.9v7.6h-4.7V12z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                            returnValue.url = "//www.linkedin.com/shareArticle?mini=true&url=" + encodedPageUrl + "&title=&summary=&source=";
                            returnValue.validationUrl = "//platform.linkedin.com/in.js";
                            break;
                        case 3 /* Mail */:
                            returnValue.iconUrl = "data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2232px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2032%2032%22%20style%3D%22enable-background%3Anew%200%200%2032%2032%3B%22%20xml%3Aspace%3D%22preserve%22%3E%3Cg%3E%3Cpath%20class%3D%22st0%22%20fill%3D%22%23FFFFFF%22%20d%3D%22M0%2C6h32v20H0V6z%20M2%2C24h28V10.125l-14%2C6.984375L2%2C10.125V24z%20M29.765625%2C8H2.234375L16%2C14.890625L29.765625%2C8z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                            returnValue.url = "mailto:?subject=Check out this great video&body=" + encodedPageUrl;
                            break;
                        case 1 /* Twitter */:
                            returnValue.iconUrl = "data:image/svg+xml;charset=utf-8,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2032%2032%22%20enable-background%3D%22new%200%200%2032%2032%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20fill%3D%22%2355ACEE%22%20d%3D%22M32%2C6.4c-1.2%2C0.5-2.4%2C0.9-3.8%2C1c1.4-0.8%2C2.4-2.1%2C2.9-3.6c-1.3%2C0.8-2.7%2C1.3-4.2%2C1.6c-1.2-1.3-2.9-2.1-4.8-2.1%2Cc-3.6%2C0-6.6%2C2.9-6.6%2C6.6c0%2C0.5%2C0.1%2C1%2C0.2%2C1.5C10.3%2C11.1%2C5.5%2C8.5%2C2.2%2C4.5c-0.6%2C1-0.9%2C2.1-0.9%2C3.3c0%2C2.3%2C1.2%2C4.3%2C2.9%2C5.5%2Cc-1.1%2C0-2.1-0.3-3-0.8c0%2C0%2C0%2C0.1%2C0%2C0.1c0%2C3.2%2C2.3%2C5.8%2C5.3%2C6.4c-0.6%2C0.1-1.1%2C0.2-1.7%2C0.2c-0.4%2C0-0.8%2C0-1.2-0.1%2Cc0.8%2C2.6%2C3.3%2C4.5%2C6.1%2C4.6c-2.2%2C1.8-5.1%2C2.8-8.2%2C2.8c-0.5%2C0-1.1%2C0-1.6-0.1c2.9%2C1.9%2C6.4%2C2.9%2C10.1%2C2.9c12.1%2C0%2C18.7-10%2C18.7-18.7%2Cc0-0.3%2C0-0.6%2C0-0.8C30%2C8.9%2C31.1%2C7.7%2C32%2C6.4z%22%2F%3E%3C%2Fsvg%3E";
                            returnValue.url = "//twitter.com/share?url=" + encodedPageUrl + "&text=";
                            returnValue.validationUrl = "//platform.twitter.com/widgets.js";
                            break;
                    }
                    returnValue.telemetryAlias = SocialShareType[shareType];
                    return returnValue;
                };
                SocialShareIcon.getErrorMessageIfNotValid = function (icon) {
                    if (!icon.url) {
                        return "didn't find valid share url";
                    }
                    if (!icon.iconUrl) {
                        return "didn't find valid icon url";
                    }
                    return "";
                };
                return SocialShareIcon;
            })();
            Share.SocialShareIcon = SocialShareIcon;
            var CandidateLink = (function () {
                function CandidateLink(text, iframeUrl, iframeWidth, iframeHeight) {
                    if (text === void 0) { text = ""; }
                    if (iframeUrl === void 0) { iframeUrl = ""; }
                    if (iframeWidth === void 0) { iframeWidth = 0; }
                    if (iframeHeight === void 0) { iframeHeight = 0; }
                    this.text = text;
                    this.iframeUrl = iframeUrl;
                    this.iframeWidth = iframeWidth;
                    this.iframeHeight = iframeHeight;
                }
                CandidateLink.prototype.getErrorMessageIfNotValid = function () {
                    if (!this.text) {
                        return "didn't find valid text";
                    }
                    if (!this.iframeUrl) {
                        return "didn't find valid iframe url";
                    }
                    if (!this.iframeWidth) {
                        return "didn't find valid iframe width";
                    }
                    if (!this.iframeHeight) {
                        return "didn't find valid iframe height";
                    }
                    return "";
                };
                return CandidateLink;
            })();
            Share.CandidateLink = CandidateLink;
            var EmbedShareOption = (function (_super) {
                __extends(EmbedShareOption, _super);
                function EmbedShareOption() {
                    _super.apply(this, arguments);
                    this.candidateLinks = [];
                }
                return EmbedShareOption;
            })(ShareOptionBase);
            Share.EmbedShareOption = EmbedShareOption;
            var ShareOptions = (function () {
                function ShareOptions() {
                    this.menuTitle = "Share";
                    this.menuIcon = "";
                    this.socialShare = new SocialShareOption();
                    this.linkShare = new ShareOptionBase();
                    this.embedShare = new EmbedShareOption();
                }
                return ShareOptions;
            })();
            Share.ShareOptions = ShareOptions;
        })(Share = Plugin.Share || (Plugin.Share = {}));
    })(Plugin = Amp.Plugin || (Amp.Plugin = {}));
})(Amp || (Amp = {}));

var Amp;
(function (Amp) {
    var Plugin;
    (function (Plugin) {
        var Share;
        (function (Share) {
            var AmpShareService = (function () {
                function AmpShareService() {
                }
                var Component = amp.getComponent('Component');
                AmpShareService.addShareToPlayer = function (player, options) {
                    AmpShareService.registerShareButton();
                    AmpShareService.registerSharePanel();
                    player.ready(function () {
                        try {
                            player.addChild("sharePanel", options);
                            var button = new amp.ShareButton(player, options);
                            var controlBarChildren = player.controlBar.children();
                            var shareButton;
                            for (var i = 0; i < controlBarChildren.length; i++) {
                                if (controlBarChildren[i].el() && controlBarChildren[i].el().className === "amp-controlbaricons-right") {
                                    var rightControlBar = player.controlBar.children()[i];
                                    shareButton = rightControlBar.addChild(button);
                                    // move the share button to the first of right control bar
                                    if (rightControlBar.children().length > 1) {
                                        var domRightControlBar = rightControlBar.el();
                                        domRightControlBar.insertBefore(domRightControlBar.children[domRightControlBar.children.length - 1], domRightControlBar.children[0]);
                                    }
                                    break;
                                }
                            }
                            if (shareButton) {
                                player.controlBar.shareButton = shareButton;
                            }
                            else {
                                Share.defaultMessageLoggerMethod("AmpShare.addShareButtonToPlayer: unable to find the right control bar", true);
                            }
                        }
                        catch (exception) {
                            Share.defaultMessageLoggerMethod("AmpShare.addShareButtonToPlayerWithException: " + exception.message, true);
                        }
                    });
                };
                AmpShareService.panelCloseButtonClick = function (component) {
                    component.hide();
                    component.player().play();
                    Share.defaultMessageLoggerMethod("AmpShare.panelCloseButtonClicked", false);
                };
                AmpShareService.linkShareButtonClick = function (element) {
                    AmpShareService.openCopyConfirmPopup(element, element.htmlEncode(element.localize("Link")), Share.getCurrentPageUrl());
                    Share.defaultMessageLoggerMethod("AmpShare.linkShareButtonClicked", false);
                };
                AmpShareService.embedShareButtonClick = function (element) {
                    var choosedSize = element.el().querySelector("." + AmpShareService.embedLinksContainerClassName + " input:checked");
                    if (choosedSize) {
                        var copiedContent = "<iframe src=\"" + choosedSize.ampShareConfig.iframeUrl + "\" frameborder= \"0\" marginwidth= \"0\" marginheight= \"0\" scrolling= \"no\" allowfullscreen= \"\" style=\"width: " + choosedSize.ampShareConfig.iframeWidth + "px; height: " + choosedSize.ampShareConfig.iframeHeight + "px;\"></iframe>";
                        AmpShareService.openCopyConfirmPopup(element, element.htmlEncode(element.localize("Embed Code")), copiedContent);
                        Share.defaultMessageLoggerMethod("AmpShare.embedShareButtonClickedWithSelected: width-" + choosedSize.ampShareConfig.iframeWidth + ", height-" + choosedSize.ampShareConfig.iframeHeight, false);
                    }
                    else {
                        Share.defaultMessageLoggerMethod("AmpShare.embedShareButtonClickedWithoutSelected", false);
                    }
                };
                AmpShareService.popupCopyClick = function (component) {
                    var textArea = component.el().querySelector("." + AmpShareService.copyConfirmPopupContainerClassName + " textarea");
                    Share.ClipBoardHelper.tryCopyTextToClipboard(textArea, textArea.value);
                    Share.defaultMessageLoggerMethod("AmpShare.popupCopyClicked", false);
                };
                AmpShareService.popupCloseClick = function (component) {
                    var container = component.el().querySelector("." + AmpShareService.copyConfirmPopupContainerClassName);
                    videojs.addClass(container, AmpShareService.vjsHiddenClassName);
                    Share.defaultMessageLoggerMethod("AmpShare.popupCloseClicked", false);
                };
                AmpShareService.registerShareButton = function () {
                    if (amp.ShareButton) {
                        return;
                    }
                    var MenuButton = amp.getComponent('MenuButton');
                    amp.ShareButton = amp.extend(MenuButton, {
                        init: function (player, options) {
                            options = options || {};
                            options.name = "shareButton";
                            MenuButton.call(this, player, options);
                        }
                    });
                    amp.ShareButton.prototype.buttonText = "Share";
                    amp.ShareButton.prototype.buildCSSClass = function () {
                        return "amp-share-control " + MenuButton.prototype.buildCSSClass.call(this) + " ";
                    };
                    amp.ShareButton.prototype.onClick = function () {
                        var player = this.player();
                        player.pause();
                        var sharePanel = player.getChild("sharePanel");
                        sharePanel.show();
                        if (sharePanel.el().clientHeight <= 0) {
                            // incase the player container height is set to 0, sharePanel will be visible.
                            // need to reset the height here.
                            sharePanel.el().style.height = player.el().clientHeight * 0.9 + "px";
                        }
                        Share.defaultMessageLoggerMethod("AmpShare.shareButtonClicked", false);
                    };
                };
                AmpShareService.registerSharePanel = function () {
                    if (amp.SharePanel) {
                        return;
                    }
                    amp.SharePanel = amp.extend(Component, {
                        init: function (player, options) {
                            Component.call(this, player, options);
                            this.hide();
                            AmpShareService.updateSharePanel(this, options);
                        }
                    });
                    amp.SharePanel.prototype.createEl = function () {
                        var element = Component.prototype.createEl.call(this, "div", {
                            className: "vjs-sharepanel",
                            innerHTML: AmpShareService.getSharePanelTemplate(this)
                        });
                        return element;
                    };
                };
                AmpShareService.updateEmbedShare = function (component, options) {
                    videojs.on(component.el().querySelector("." + AmpShareService.embedShareContainerClassName + " > button"), "click", function () {
                        AmpShareService.embedShareButtonClick(component);
                    });
                    if (!options || !options.isEnable) {
                        videojs.addClass(component.el().querySelector("." + AmpShareService.embedShareContainerClassName), AmpShareService.vjsHiddenClassName);
                        return;
                    }
                    if (!options.candidateLinks || options.candidateLinks.length <= 0) {
                        Share.defaultMessageLoggerMethod("AmpShare.noEmbedShareOption", false);
                        videojs.addClass(component.el().querySelector("." + AmpShareService.embedShareContainerClassName), AmpShareService.vjsHiddenClassName);
                        return;
                    }
                    var validCandidateLink = 0;
                    for (var i = 0; i < options.candidateLinks.length; i++) {
                        var candidateLink = options.candidateLinks[i];
                        if (!candidateLink) {
                            Share.defaultMessageLoggerMethod("AmpShare.unknownEmbedLinkShareOption", true);
                            continue;
                        }
                        var validationError = candidateLink.getErrorMessageIfNotValid();
                        if (validationError) {
                            Share.defaultMessageLoggerMethod("AmpShare.invalidEmbedLinkShareOption : " + validationError, true);
                            continue;
                        }
                        var linkRadioNode = Component.prototype.createEl.call(component, "input", {
                            "type": "radio",
                            "name": "embedsize",
                            "ampShareConfig": candidateLink
                        });
                        //preselect the first one.
                        if (i === 0) {
                            linkRadioNode.checked = true;
                        }
                        if (!candidateLink.text) {
                        }
                        var linkLabel = Component.prototype.createEl.call(component, "label", {
                            innerHTML: candidateLink.text
                        });
                        component.el().querySelector("." + AmpShareService.embedLinksContainerClassName).appendChild(linkRadioNode);
                        component.el().querySelector("." + AmpShareService.embedLinksContainerClassName).appendChild(linkLabel);
                        component.el().querySelector("." + AmpShareService.embedLinksContainerClassName).appendChild(Component.prototype.createEl.call(component, "br"));
                        validCandidateLink++;
                    }
                    if (validCandidateLink > 0) {
                        videojs.removeClass(component.el().querySelector("." + AmpShareService.embedShareContainerClassName), AmpShareService.vjsHiddenClassName);
                    }
                    else {
                        Share.defaultMessageLoggerMethod("AmpShare.noVisibleEmbedShareOption", false);
                        videojs.addClass(component.el().querySelector("." + AmpShareService.embedShareContainerClassName), AmpShareService.vjsHiddenClassName);
                    }
                };
                AmpShareService.updateSocialShare = function (component, options) {
                    var socialIconsContainer = component.el().querySelector("." + AmpShareService.socialIconsContainerClassName);
                    if (!options || !options.isEnable) {
                        videojs.addClass(socialIconsContainer, AmpShareService.vjsHiddenClassName);
                        return;
                    }
                    videojs.removeClass(socialIconsContainer, AmpShareService.vjsHiddenClassName);
                    while (socialIconsContainer.lastChild) {
                        socialIconsContainer.removeChild(socialIconsContainer.lastChild);
                    }
                    if (!options.shareIcons || options.shareIcons.length <= 0) {
                        Share.defaultMessageLoggerMethod("AmpShare.noSocialShareOption", false);
                        return;
                    }
                    for (var i = 0; i < options.shareIcons.length; i++) {
                        var shareIcon = options.shareIcons[i];
                        if (!shareIcon) {
                            Share.defaultMessageLoggerMethod("AmpShare.unknownSocialShareOption", true);
                            break;
                        }
                        var validationError = Share.SocialShareIcon.getErrorMessageIfNotValid(shareIcon);
                        if (validationError) {
                            Share.defaultMessageLoggerMethod("AmpShare.invalidSocialShareOption : " + validationError, true);
                            break;
                        }
                        var iconNode = Component.prototype.createEl.call(component, "div", {
                            className: "vjs-share-socialIcon",
                            innerHTML: "<a href=\"" + shareIcon.url + "\" target=\"_blank\"><img src=\"" + shareIcon.iconUrl + "\" /></a>"
                        });
                        AmpShareService.registerSocialShareIconClick(iconNode, shareIcon);
                        if (shareIcon.validationUrl) {
                            videojs.addClass(iconNode, AmpShareService.vjsHiddenClassName);
                            AmpShareService.showSocialIconIfReachable(iconNode, shareIcon.validationUrl);
                        }
                        socialIconsContainer.appendChild(iconNode);
                    }
                };
                AmpShareService.updateLinkShare = function (component, options) {
                    if (options && options.isEnable) {
                        videojs.removeClass(component.el().querySelector("." + AmpShareService.linkContainerClassName), AmpShareService.vjsHiddenClassName);
                    }
                    else {
                        videojs.addClass(component.el().querySelector("." + AmpShareService.linkContainerClassName), AmpShareService.vjsHiddenClassName);
                    }
                    videojs.on(component.el().querySelector("." + AmpShareService.linkContainerClassName + " > button"), "click", function () {
                        AmpShareService.linkShareButtonClick(component);
                    });
                };
                AmpShareService.updateSharePanel = function (component, options) {
                    videojs.on(component.el().querySelector(".vjs-sharepanel-close > a"), "click", function () {
                        AmpShareService.panelCloseButtonClick(component);
                    });
                    if (!options) {
                        Share.defaultMessageLoggerMethod("AmpShare.unknowShareOption", true);
                        return;
                    }
                    AmpShareService.updateSocialShare(component, options.socialShare);
                    AmpShareService.updateLinkShare(component, options.linkShare);
                    AmpShareService.updateEmbedShare(component, options.embedShare);
                    videojs.on(component.el().querySelector("." + AmpShareService.copyConfirmPopupContainerClassName + " > button"), "click", function () {
                        AmpShareService.popupCopyClick(component);
                    });
                    videojs.on(component.el().querySelector("." + AmpShareService.copyConfirmPopupContainerClassName + " > a"), "click", function () {
                        AmpShareService.popupCloseClick(component);
                    });
                };
                AmpShareService.openCopyConfirmPopup = function (component, title, copyContent) {
                    var container = component.el().querySelector("." + AmpShareService.copyConfirmPopupContainerClassName);
                    var textArea = component.el().querySelector("." + AmpShareService.copyConfirmPopupContainerClassName + " textarea");
                    textArea.value = copyContent;
                    var label = component.el().querySelector("." + AmpShareService.copyConfirmPopupContainerClassName + " label");
                    label.textContent = title;
                    videojs.removeClass(container, AmpShareService.vjsHiddenClassName);
                };
                AmpShareService.getSharePanelTemplate = function (component) {
                    return "\n<div class=\"vjs-sharepanel-controls\">\n\t<div class=\"vjs-sharepanel-header\">\n\t\t<div class=\"vjs-sharepanel-close\">\n\t\t\t<a href=\"javascript:void()\">\n\t\t\t\t<span class=\"vjs-sharepanel-close-image\"/>\n\t\t\t\t<span class=\"screen-reader-text\">" + component.htmlEncode(component.localize("Close")) + "</span>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class=\"vjs-shareoptions\">\n\t\t<div class=\"vjs-shareoptions-social\">\n\t\t\t<label>" + component.htmlEncode(component.localize("Share")) + "</label>\n\t\t\t<hr/>\n\t\t\t<div class=\"" + AmpShareService.socialIconsContainerClassName + " " + AmpShareService.vjsHiddenClassName + "\"></div>\n\t\t</div>\n\t\t<div class=\"vjs-sharepanel-bottom\">\n\t\t\t<div class=\"" + AmpShareService.linkContainerClassName + " " + AmpShareService.vjsHiddenClassName + "\">\n\t\t\t\t<label class=\"vjs-label\">" + component.htmlEncode(component.localize("Link")) + "</label>\n\t\t\t\t<hr/>\n\t\t\t\t<button>" + component.htmlEncode(component.localize("Copy Url")) + "</button>\n\n\t\t\t</div>\n\t\t\t<div class=\"" + AmpShareService.embedShareContainerClassName + " " + AmpShareService.vjsHiddenClassName + "\">\n\t\t\t\t<label>" + component.htmlEncode(component.localize("Embed")) + "</label>\n\t\t\t\t<hr/>\n\t\t\t\t<div class=\"" + AmpShareService.embedLinksContainerClassName + "\"></div>\n\t\t\t\t<button>" + component.htmlEncode(component.localize("Copy Url")) + "</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n    <div class=\"" + AmpShareService.copyConfirmPopupContainerClassName + " " + AmpShareService.vjsHiddenClassName + "\">\n        <a href=\"javascript:void()\">\n\t\t\t<span class=\"vjs-sharePopup-Closeimage\"/>\n\t\t\t<span class=\"screen-reader-text\">" + component.htmlEncode(component.localize("Close")) + "</span>\n        </a>\n\t\t<label></label>\n        <textarea>Error occur when try to copy content</textarea>\n\t\t<button>" + component.htmlEncode(component.localize("Copy")) + "</button>\n    </div>\n</div>";
                };
                AmpShareService.showSocialIconIfReachable = function (iconNode, validationUrl) {
                    Share.SocialShareOnlineChecker.isSocialShareOnline(validationUrl, function () {
                        videojs.removeClass(iconNode, AmpShareService.vjsHiddenClassName);
                    }, function () {
                        videojs.addClass(iconNode, AmpShareService.vjsHiddenClassName);
                    });
                };
                AmpShareService.registerSocialShareIconClick = function (iconNode, shareIconConfig) {
                    var trackingAlias = shareIconConfig.telemetryAlias;
                    if (!trackingAlias) {
                        trackingAlias = Share.SocialShareType[shareIconConfig.shareType];
                    }
                    videojs.on(iconNode, "click", function () {
                        Share.defaultMessageLoggerMethod("AmpShare.socialShareIconClicked:" + trackingAlias, false);
                    });
                };
                AmpShareService.socialIconsContainerClassName = "vjs-shareoptions-socialIcons";
                AmpShareService.vjsHiddenClassName = "vjs-hidden";
                AmpShareService.linkContainerClassName = "vjs-shareoptions-link";
                AmpShareService.embedShareContainerClassName = "vjs-shareoptions-embed";
                AmpShareService.embedLinksContainerClassName = "vjs-shareoptions-embedOption";
                AmpShareService.copyConfirmPopupContainerClassName = "vjs-sharePanel-CopyConfirmPopupContainer";
                return AmpShareService;
            })();
            Share.AmpShareService = AmpShareService;
        })(Share = Plugin.Share || (Plugin.Share = {}));
    })(Plugin = Amp.Plugin || (Amp.Plugin = {}));
})(Amp || (Amp = {}));

var Amp;
(function (Amp) {
    var Plugin;
    (function (Plugin) {
        var Share;
        (function (Share) {
            function ampSharePlugin(options) {
                Share.AmpShareService.addShareToPlayer(this, options);
                console.log('here in func def');
            }
            Share.ampSharePlugin = ampSharePlugin;
        })(Share = Plugin.Share || (Plugin.Share = {}));
    })(Plugin = Amp.Plugin || (Amp.Plugin = {}));
})(Amp || (Amp = {}));

    ((function (mediaPlayer) {
       
       
        mediaPlayer.plugin("share", Amp.Plugin.Share.ampSharePlugin);
    })(window.amp));


