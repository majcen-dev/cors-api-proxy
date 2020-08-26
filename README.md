# CORS API Proxy

An Express server that lets you proxy **xml** and **json** APIs with limiting CORS headers.<br/>
You can also retrieve any server rendered website as text/plain for the purposes of [parsing](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser).<br/>
For that select the content type **html**.

You can also proxy POST requests but that feature is currently experimental. More details below.

### Throttling:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Repeated usage is throttled via [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) and [Express Slow Down](https://www.npmjs.com/package/express-slow-down).<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You can clone the repository and change these settings for your own use.

### Live version:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://majcen-cors-api-proxy.herokuapp.com <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <sub>*Hosted on Heroku. Please wait for up to 10s for the server to wake up.*</sup>


## Usage GET

You can use the UI on the home page or get data directly from the URL:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ***proxy-origin-url***/proxy/***content-type***/***target-api-url***  [content types: **xml**, **json**, **html**]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Example: https://majcen-cors-api-proxy.herokuapp.com/proxy/json/https://jsonplaceholder.typicode.com/todos/1

## Usage POST *(experimental)*
***The POST API is experiemtal and has not yet been extensively tested.*** <br/>

You can use the UI on the home page or get data directly from the URL:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ***proxy-origin-url***/proxy/post/***target-api-url*** <br/><br/>
You can optionally attach a body to your request.<br/>
Example: https://majcen-cors-api-proxy.herokuapp.com/proxy/post/https://postman-echo.com/post <br/>
See below how to structure your body in the request.<br/>

*Be sure to format you JSON payload properly as there is no error handling at this time.*<br/>
The only accepted content type is ***'application/json'***.<br/>

CORS API Proxy will return the following JSON response:
```JSON
{
  "headers": "...",
  "response": "..."
}
```

If you provide a JSON body it must be in the following format:

```JSONC
{
  "payload": {
    /*YOUR_JSON_DATA*/
  }
}
```
For example:
```JSON
{
  "payload": {
    "example": {
      "example2": "",
      "example3": "",
      ...
    }
  }
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
## Alternative POST usage *(experimental)*
You can invoke the POST API as a GET request:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ***proxy-origin-url***/proxy/post-as-get/?base=***BASE64-encoded-string*** <br/><br/>
Example: https://majcen-cors-api-proxy.herokuapp.com/proxy/post-as-get/?base=eyJ1IjoiaHR0cHM6Ly9wb3N0bWFuLWVjaG8uY29tL3Bvc3QiLCJwIjoie1wiZXhhbXBsZU5hbWUxXCI6XCJcIixcImV4YW1wbGVOYW1lMlwiOlwiXCJ9In0=

<br/>The BASE64 string is formed from the following JSON object:
```JSON
{"u": "URL", "p": "JSON_BODY_DATA"}
```
Note that the ***u*** and ***p*** parameters cannot be renamed.<br/>
The BASE64 string can be created in JavaScript like this:
```Javascript
const obj = {
  u: 'https://postman-echo.com/post',
  p: '{"exampleName1":"","exampleName2":""}'
};
const base64Payload = btoa(JSON.stringify(obj));
```

## User interface

The UI on the homepage will help you to construct GET and POST requests.

### Live version:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://majcen-cors-api-proxy.herokuapp.com <br/>