# CORS API Proxy

An Express server that lets you proxy APIs with limiting CORS headers.

## Usage

You can use the UI on the home page orget data directly from the URL:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ***hostname/content-type/api-url***  [content types: **xml**, **json**, **html**]<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Example: https://majcen-cors-api-proxy.herokuapp.com/proxy/json/https://jsonplaceholder.typicode.com/todos/1

### Live version:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://majcen-cors-api-proxy.herokuapp.com

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Please note that repeated usage is throttled via [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) and [Express Slow Down](https://www.npmjs.com/package/express-slow-down).<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You can clone this repository and change these settings for your own use.