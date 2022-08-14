/**
 * @file
 * Recommended articles embed API Request.
 */
var articleData = drupalSettings.articleDetails;
// ### Document Ready - START ###
jQuery(document).ready(function () {
    // ### Recommended articles - START ###
    jQuery('.group-story-timestamp').ready(function () {
        jQuery('.group-story-timestamp').hide();
        var today = new Date();
        var tweleveHoursAgo = new Date(today.getTime() - (1000*60*60*12));
        var tweleveHoursAgoTimeStamp = Math.round((tweleveHoursAgo).getTime() / 1000);
        var articleStatus = articleData.status;
        var articlePublishOn = articleData.publish_on;
        var dateFormat = {
            timeZone: 'Asia/Singapore',
            day:   'numeric',
            month: 'short',
            year:  'numeric',
            hour:   'numeric',
            minute: '2-digit',
            hour12: true,
        };
        if(typeof articleData.changed !== "undefined" && jQuery('.story-changeddate').length > 0) {
            var changed = articleData.changed;
            var changeDate = new Date((changed * 1000));
            if(changed > tweleveHoursAgoTimeStamp) {
                var microSecondsDiff = Math.abs(changeDate.getTime() - today.getTime());
                var hoursDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));
                var minsDiff = Math.floor(microSecondsDiff / (1000 * 60));
                var secsDiff = Math.floor(microSecondsDiff / 1000);
                if(hoursDiff == 1) {
                    jQuery('.story-changeddate').html(hoursDiff + ' Hour Ago');
                } else if(hoursDiff > 1) {
                    jQuery('.story-changeddate').html(hoursDiff + ' Hours Ago');
                } else if(minsDiff == 1) {
                    jQuery('.story-changeddate').html(minsDiff + ' Min Ago');
                } else if(minsDiff > 1) {
                    jQuery('.story-changeddate').html(minsDiff + ' Mins Ago');
                } else {
                    jQuery('.story-changeddate').html(secsDiff + ' Secs Ago');
                }
            } else {
                jQuery('.story-changeddate').html(changeDate.toLocaleString(undefined, dateFormat) + ' SGT');
            }
        }
        if(typeof articleData.created !== "undefined" && jQuery('.story-postdate').length > 0) {
            if(articleStatus == 0 && articlePublishOn != '' && articlePublishOn != null) {
                var created = articlePublishOn;
                jQuery('.group-story-postdate .field-label-inline').html('Scheduled Published On');
                var createdDate = new Date((created * 1000));
                jQuery('.story-postdate').html(createdDate.toLocaleString(undefined, dateFormat) + ' SGT');
            } else {
                var created = articleData.created;
                var createdDate = new Date((created * 1000));
                if(created > tweleveHoursAgoTimeStamp) {
                    var microSecondsDiff = Math.abs(createdDate.getTime() - today.getTime());
                    var hoursDiff = Math.floor(microSecondsDiff / (1000 * 60 * 60));
                    var minsDiff = Math.floor(microSecondsDiff / (1000 * 60));
                    var secsDiff = Math.floor(microSecondsDiff / 1000);
                    if(hoursDiff == 1) {
                        jQuery('.story-postdate').html(hoursDiff + ' Hour Ago');
                    } else if(hoursDiff > 1) {
                        jQuery('.story-postdate').html(hoursDiff + ' Hours Ago');
                    } else if(minsDiff == 1) {
                        jQuery('.story-postdate').html(minsDiff + ' Min Ago');
                    } else if(minsDiff > 1) {
                        jQuery('.story-postdate').html(minsDiff + ' Mins Ago');
                    } else {
                        jQuery('.story-postdate').html(secsDiff + ' Secs Ago');
                    }
                } else {
                    jQuery('.story-postdate').html(createdDate.toLocaleString(undefined, dateFormat) + ' SGT');
                }
            }
        }
        jQuery('.group-story-timestamp').show();
    });
    // ### Recommended articles - END ###
});
// ### Document Ready - END ###
