# cec_node

```cec_mode``` is a super thin interface to the cec-client binary. 

If your hardware supports CEC (eg RaspberryPI), or you have
the USB adapter, you can listener to CEC events, as well as send them.

## Usage

```javascript
var CEC = require('cec_node');
cec = CEC.start();

// To listen events
cec.addListener("*", function(code) {
  console.log(code);
});

// To listen to events from the tv
var id = cec.addListener("0*", function(code) {
  console.log("TV: " + code);
});

// To remove a listener
cec.removeListener(id);

// To send a code
cec.send("10:04");
```

## Development

Want to contribute?

Clone the repo:

```git clone git://github.com/madpilot/cec_node.git```

Then:

```
cd cec_node
npm install
```

## License

(The MIT License)

Copyright (c) 2013-2015 Myles Eftos <myles@madpilot.com.au>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
