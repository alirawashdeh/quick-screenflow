# Introduction

Quick Screenflow is a lightweight node project that produces simple screenflow diagrams in PDF format, based on a set of input URLs. It uses puppeteer and can screenshot pages that use basic authentication - making it perfect for producing screenflows from prototypes.


# Installation

```
git clone https://github.com/alirawashdeh/quick-screenflow.git
cd quick-screenflow
npm install
```

# Configuration

Update the `config.json` file to include all the URLs you need to screenshot.

Simple screenflow example, with three screens:

```
{
  "name": "Finding alirawashdeh on GitHub",
  "screens": [
    { "name": "1. Google", "url": "https://www.google.com" },
    { "name": "2. Google search", "url": "https://www.google.com/search?q=alirawashdeh%20github" },
    { "name": "3. Github", "url": "https://github.com/alirawashdeh" }
  ]
},
```

Example using basic authentication:

```
{
  "name": "Basic auth example",
  "username":"user",
  "password":"password",
  "screens": [
    { "name": "1. Protected page", "url": "https://dfdm943axhisa.cloudfront.net" }
    ]
}
```

# Usage

Run the project using

```
npm start
```

# Credits
This project is based on
[puppeteer-examples](https://github.com/checkly/puppeteer-examples)