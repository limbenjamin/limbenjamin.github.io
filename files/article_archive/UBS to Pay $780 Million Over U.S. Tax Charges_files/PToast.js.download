(function() {
    var setCookie = function setCookie(c_name, value, expiredays, path, domain) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ';path=' + path + ';domain=' + domain;
    }
    var getCookie = function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return false;
    }

    PToast = {};
    PToast.ToastSlice = Class.create({
        options: {
            optionsHtml: '<a class="toast-slice-opt-close" href="#">close</a> | <a class="toast-slice-optout" href="#">opt out</a> | <a href="http://specials.washingtonpost.com/post-alert/about/">what is this?</a>'
        },
        notice: null,
        slice: null,
        sliceContent: null,
        sliceDrag: null,
        shown: false,
        pinned: false,
        id: null,
        closeTimer: null,
        onRemove: null,
        onOptOut: null,
        initialize: function(notice, _onRemove, _onOptOut) {
            this.notice = notice;
            this.onRemove = _onRemove;
            this.onOptOut = _onOptOut;

            this.slice = new Element('div', { "class": "toast-slice" });
            var code = '';
            code += '<div class="toast-slice">';
            code += '<div class="toast-slice-top-left"><div class="toast-slice-drag"></div><div class="toast-slice-top-right"><div class="toast-slice-pin"></div><div class="toast-slice-close"></div></div></div>';
            code += '<div class="toast-slice-middle-left"><div class="toast-slice-middle-right">';
            code += '<div class="toast-slice-content"></div>';
            code += '<div class="toast-slice-options">' + this.options.optionsHtml + '</div>';
            code += '</div></div>';
            code += '<div class="toast-slice-bottom-left"><div class="toast-slice-bottom-right"></div></div>';
            code += '</div>';
            this.slice.innerHTML = code;

            this.sliceContent = this.slice.getElementsBySelector('.toast-slice-content')[0];
            this.sliceContent.innerHTML = this.buildNoticeCode();

            /* TODO add dragging */
            this.slice.getElementsBySelector('.toast-slice-pin')[0].observe('click', function(e) {
                e.stop();
                if (this.pinned) {
                    this.unpin();
                } else {
                    this.pin();
                }
            } .bind(this));
            this.sliceDrag = new Draggable(this.slice, {
                scroll: window,
                handle: this.slice.getElementsBySelector('.toast-slice-drag')[0],
                onStart: function() {
                    var coords = this.slice.cumulativeOffset($(document.body));
                    this.slice.setStyle({ position: 'absolute', width: this.slice.getDimensions().width + 'px', top: coords.top + 'px', left: coords.left + 'px' });
                    $(document.body).insert(this.slice, 'top');
                    this.onRemove(this);
                    this.pin();
                } .bind(this),
                onEnd: function() {
                    this.slice.setStyle({ "z-index": 1000 });
                } .bind(this)
            });
            this.slice.getElementsBySelector('.toast-slice-close')[0].observe('click', this.close.bind(this));
            this.slice.getElementsBySelector('.toast-slice-optout')[0].observe('click', this.clickOptOut.bind(this));
            this.slice.getElementsBySelector('.toast-slice-opt-close')[0].observe('click', this.close.bind(this));
            this.slice.observe('mouseover', this.stopCloseTimer.bind(this));
            this.slice.observe('mouseout', this.startCloseTimer.bind(this));
        },
        buildNoticeCode: function() {
            var content = '';
            if (this.notice.title) {
                content += '<h4>' + this.notice.title + '</h4>';
            }
            if (this.notice.shortHtml) {
                content += this.notice.shortHtml;
            }
            return content;
        },
        close: function(e) {
            this.onRemove(this);
            new Effect.Opacity(this.slice, { duration: 1, transition: Effect.Transitions.sinoidal, from: 1, to: 0, afterFinish: function() {
                this.sliceContent = null;
                this.slice.remove();
            } .bind(this)
            });
            if(e){
            	e.stop();
            }
        },
        startCloseTimer: function() {
            if (!this.pinned) {
                clearTimeout(this.closeTimer);
                this.closeTimer = setTimeout(this.close.bind(this), this.notice.duration * 1000);
            }
        },
        stopCloseTimer: function() {
            clearTimeout(this.closeTimer);
        },
        pin: function() {
            this.pinned = true;
            this.slice.getElementsBySelector('.toast-slice-pin')[0].addClassName('toast-slice-pin-pinned');
            this.stopCloseTimer();
        },
        unpin: function() {
            this.pinned = false;
            this.slice.getElementsBySelector('.toast-slice-pin')[0].removeClassName('toast-slice-pin-pinned');
            this.startCloseTimer();
        },
        showOptOut: function() {
            this.slice.getElementsBySelector('.toast-slice-content')[0].innerHTML = 'A cookie will be set to stop these alerts. You will receive them again if you delete your cookies.';
            this.slice.getElementsBySelector('.toast-slice-options')[0].innerHTML = '<a href="#" class="toast-slice-optout-yes">Ok</a> | <a href="#" class="toast-slice-optout-no">Cancel</a>';
            this.slice.getElementsBySelector('.toast-slice-optout-yes')[0].observe('click', function(e) {
                this.onOptOut(this);
                e.stop();
            } .bind(this));
            this.slice.getElementsBySelector('.toast-slice-optout-no')[0].observe('click', this.hideOptOut.bind(this));
        },
        hideOptOut: function() {
            this.slice.getElementsBySelector('.toast-slice-content')[0].innerHTML = this.buildNoticeCode();
            this.slice.getElementsBySelector('.toast-slice-options')[0].innerHTML = this.options.optionsHtml;
            this.slice.getElementsBySelector('.toast-slice-optout')[0].observe('click', this.clickOptOut.bind(this));
            this.slice.getElementsBySelector('.toast-slice-opt-close')[0].observe('click', this.close.bind(this));
        },
        clickOptOut: function(e) {
            this.showOptOut();
            if(e){
            	Event(e).stop();
            }
        }

    });

    PToast.Toast = Class.create({
        toaster: null,
        slices: [],
        lastSlice: null,
        popTimer: null,
        options: {
            interval: 6000 // in milliseconds
        },
        initialize: function() {

            this.toaster = new Element('div', { 'class': 'toast-toaster' }) 
            $(document.body).insert(this.toaster, 'top');

            this.lastSlice = getCookie('toasterLastSlice') ? parseInt(getCookie('toasterLastSlice')) : 0;
            /*'/static/wp/toast/static.jsn' 'js/JScript.js'*/
            new Ajax.Request('/static/wp/toast/static.jsn', {
                method: 'get',
                onComplete: this.gotNotices.bind(this)
            });
            document.observe('resize', this.moveToaster.bind(this));
            document.observe('scroll', this.moveToaster.bind(this));
        },
        gotNotices: function(jsonData) {
            var notices = jsonData.responseText.evalJSON();
            notices.each(function(s) {
                if (this.lastSlice < s.id && thisNode) {
                    var nodes = thisNode.split('/');
                    for (var i = 0; i < nodes.length; i++) {
                        if ($A(s.tags).include(nodes[i]) || $A(s.tags).include('*')) {
                            this.slices.push(new PToast.ToastSlice(s, this.eatSlice.bind(this), this.killToaster.bind(this)));
                            break;
                        }
                    }
                }
            } .bind(this));
            this.popTimer = setTimeout(this.popSlice.bind(this), this.options.interval);
        },
        popSlice: function() {
            for (i = 0; i < this.slices.length; i++) {
                var slice = this.slices[i];
                if (!slice.shown) {
                    this.toaster.insert(slice.slice);
                    var offset = slice.slice.getDimensions().height;
                    slice.slice.setStyle({ top: offset + 'px' });
                    new Effect.Morph(slice.slice, { duration: 1, transition: Effect.Transitions.spring, style: { top: '0px'} });
                    for (p = 0; p < this.slices.length; p++) {
                        if (this.slices[p].shown) {
                            this.slices[p].slice.setStyle({ top: offset + 'px' });
                            new Effect.Morph(this.slices[p].slice, { duration: 1, transition: Effect.Transitions.spring, style: { top: '0px'} });
                        }
                    }
                    slice.shown = true;
                    this.lastSlice = slice.notice.id;
                    setCookie('toasterLastSlice', this.lastSlice, 14, '/', '.washingtonpost.com');
                    slice.startCloseTimer();
                    this.popTimer = null;
                    this.popTimer = setTimeout(this.popSlice.bind(this), this.options.interval);
                    break;
                }
            }

        },
        eatSlice: function(e) {
            this.slices.splice(this.slices.indexOf(e),1);
        },
        moveToaster: function() {
            this.toaster.setStyle({ bottom: -(window.pageYOffset || $(document.body).scrollTop) + 'px' });
        },
        killToaster: function() {
            this.slices.each(function(s) {
                if (s.shown) {
                    s.close();
                }
            } .bind(this));
            setCookie('toasterOptOut', true, 14, '/', '.washingtonpost.com');
            clearTimeout(this.popTimer);
        }
    });

    if (!PToast.toaster && !getCookie('toasterOptOut')) {
        PToast.toaster = new PToast.Toast();
    }else{
        setCookie('toasterOptOut', true, 14, '/', '.washingtonpost.com');
    }
})();