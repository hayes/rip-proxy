const http = require('http')
const https = require('https')

http.createServer((req, res) => {
  const requestUrl = req.url.startsWith('/view/ripcityultimate') ?
    req.url.slice(21) :
    req.url

  var request = https.request({
    protocol: 'https:',
    hostname: 'sites.google.com',
    method: req.method,
    path: `/view/ripcityultimate${requestUrl}`,
  }, (response) => {
    res.statusCode = response.statusCode
    res.headers = response.headers
    response.pipe(res).on('error', onerror)
  })

  req.on('error', onerror)

  req.pipe(request).on('error', onerror)
  
  function onerror (err) {
    console.error(err)
    req.connection.destroy()
  }
}).listen(5000)
