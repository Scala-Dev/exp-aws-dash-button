/**
 * This is a sample Lambda function that calls a webhook in EXP at the click of a
 * button. It sends a hardcoded payload that in this example includes launch options 
 * for a fling event.
 *
 * Follow these steps to complete the configuration of your function:
 *
 * 1. Update the WEBHOOK_URL variable with the url of your webhook from EXP.
 * 2. Update the CONTENT variable with a url to a piece of external content or the uuid of content within EXP.
 */

const http = require('https');
const url = require('url');

const WEBHOOK_URL = 'https://api.goexp.io/api/webhooks/broadcasts/<web hook token>';
const CONTENT = 'http://docs.goexp.io/common_images/exp_logo.png';

/**
 * The following JSON template shows what is sent as the payload:
{
    "serialNumber": "GXXXXXXXXXXXXXXXXX",
    "batteryVoltage": "xxmV",
    "clickType": "SINGLE" | "DOUBLE" | "LONG"
}
 *
 * A "LONG" clickType is sent if the first press lasts longer than 1.5 seconds.
 * "SINGLE" and "DOUBLE" clickType payloads are sent for short clicks.
 *
 * For more documentation, follow the link below.
 * http://docs.aws.amazon.com/iot/latest/developerguide/iot-lambda-rule.html
 */
exports.handler = (event, context, callback) => {
    console.log('Received event:', event.clickType);
    
    var parsedUrl = url.parse(WEBHOOK_URL);

    var options = {
      hostname: parsedUrl.host,
      port: 443, // EXP supports SSL only
      path: parsedUrl.path,
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      }
    };
    
    console.log(options);
    
    var req = http.request(options, function(res) {
      console.log('Status: ' + res.statusCode);
      console.log('Headers: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      res.on('data', function (body) {
        console.log('response body: ', body);
        callback();
      });
    });
    
    req.on('error', function(e) {
      console.log('problem with request: ', e.message);
    });

    var webhookBody = {
      content: CONTENT
    };
    
    // write data to request body
    req.write(JSON.stringify(webhookBody));
    req.end();
};