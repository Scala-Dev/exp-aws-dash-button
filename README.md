# Sample AWS Lambda function for Dash IoT Buttons

## EXP Setup

Create a Broadcast Webhook in EXP with the following steps:

1. Create a webhook on the Broadcast Webhook page: https://goexp.io/organization/broadcast-webhooks
2. Enter a unique name for this webhook.
3. Enter `fling` as the event name.
4. Enter `organization` as the channel name to fling to all players. Alternatively, specify the uuid of a device or location to narrow the targeted players.
5. Save the webhook and open the detail view for the webhook you just created.
6. Copy the url into `index.js` as the value of the `WEBHOOK_URL` variable.
7. Modify the value of the `CONTENT` variable in `index.js` to specify a url of external content or the uuid of content within your organization.

## AWS Setup

Follow the Lambda Blueprint Wizard, located here: 

https://aws.amazon.com/iotbutton/getting-started/

Copy the index.js file in this project into the Lambda function code editor.

Push button and enjoy!