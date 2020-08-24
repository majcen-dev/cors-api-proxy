# CORS API Proxy

An Express server that lets you proxy **xml** and **json** APIs with limiting CORS headers.<br/>
You can also retrieve any server rendered website as text/plain for the purposes of [parsing](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser).<br/>
For that select the content type **html**.

*Only GET requests are currently supported.*

## Usage

You can use the UI on the home page orget data directly from the URL:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ***server-hostname***/proxy/***content-type***/***target-api-url***  [content types: **xml**, **json**, **html**]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Example: https://majcen-cors-api-proxy.herokuapp.com/proxy/json/https://jsonplaceholder.typicode.com/todos/1

### Throttling:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Repeated usage is throttled via [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) and [Express Slow Down](https://www.npmjs.com/package/express-slow-down).<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You can clone the repository and change these settings for your own use.

### Live version:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://majcen-cors-api-proxy.herokuapp.com <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <sub>*Hosted on Heroku. Please wait for up to 10s for the server to wake up.*</sup>