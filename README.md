# CORS API Proxy

An Express server that lets you proxy **xml** and **json** APIs with limiting CORS headers.<br/>
You can also retrieve any server rendered website as text/plain for the purposes of [parsing](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser).<br/>
For that select the content type **html**.

You can also proxy POST requests. More details below.

### Throttling:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Repeated usage is throttled via [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) and [Express Slow Down](https://www.npmjs.com/package/express-slow-down).<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You can clone the repository and change these settings for your own use.

### Live version:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://majcen-cors-api-proxy.herokuapp.com <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <sub>*Hosted on Heroku. Please wait for up to 10s for the server to wake up.*</sup>


## Using GET

You can use the UI on the home page or get data directly from the URL:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ***proxy-origin-url***/proxy/***content-type***/***target-api-url***  [content types: **xml**, **json**, **html**]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Example: https://majcen-cors-api-proxy.herokuapp.com/proxy/json/https://jsonplaceholder.typicode.com/todos/1

## Using POST

You can use the UI on the home page or get data directly from the URL:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ***proxy-origin-url***/proxy/post/***target-api-url*** <br/><br/>
You can optionally attach a body to your request.<br/>
Example: https://majcen-cors-api-proxy.herokuapp.com/proxy/post/https://postman-echo.com/post <br/>
See below how to structure your body and cookies in the request.<br/>

*Be sure to format you JSON and Cookie payload properly as error handling is limited.*<br/>
The only accepted content type is ***'application/json'***.<br/>

CORS API Proxy will return the following JSON response:

```JSON
{
  "headers": "...",
  "response": "..."
}
```

If you provide an optional JSON body and cookie string they must be in the following format:

```JSONC
{
  "body": /* JSON_BODY_DATA */,
  "cookie": "COOKIE_STRING",
  "ac": /* Access-Control-Allow-Credentials_BOOLEAN */
}
```
For example:

```JSONC
{
  "body": {
    "example": {
      "example2": "",
      "example3": ""
    }
  },
  "cookie": "name=exampleName; SessionID=fd5example8cb;",
  "ac": true
}
```
Example of JavaScript code to invoke the POST API:
```Javascript
const JSON_OBJECT = '{"payload": {"exampleName1":"","exampleName2":""}}';
fetch('https://majcen-cors-api-proxy.herokuapp.com/proxy/post/https://postman-echo.com/post', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
    body: JSON_OBJECT
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
```
## Using POST as a GET request
You can invoke the POST API as a GET request:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ***proxy-origin-url***/proxy/post-as-get/?base=***BASE64-encoded-string*** <br/><br/>
Example: https://majcen-cors-api-proxy.herokuapp.com/proxy/post-as-get/?base=eyJ1IjoiaHR0cHM6Ly9wb3N0bWFuLWVjaG8uY29tL3Bvc3QiLCJwIjoie1wiZXhhbXBsZU5hbWUxXCI6XCJcIixcImV4YW1wbGVOYW1lMlwiOlwiXCJ9In0=

<br/>The BASE64 string is formed from the following JSON object:

```JSONC
{
  "url": "TARGET_URL",
  "body": /* JSON_BODY_DATA */,
  "cookie": "COOKIE_STRING",
  "ac": /* Access-Control-Allow-Credentials_BOOLEAN */
}
```
The BASE64 string can be created in JavaScript like this:
```Javascript
const obj = {
  url: 'https://postman-echo.com/post',
  body: '{"exampleName1":"","exampleName2":""}'
  cookie: "name=exampleName; SessionID=fd5example8cb;", 
  ac: true
};
const base64Payload = btoa(JSON.stringify(obj));
```

## User interface

The UI on the homepage will help you to construct GET and POST requests.

### Live version:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://majcen-cors-api-proxy.herokuapp.com <br/>