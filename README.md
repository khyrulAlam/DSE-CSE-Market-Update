# Dhaka Stock Exchange & Chittogong Stock Exchange Market Update

Share Market data scraping from [Dhaka stock exchange](https://www.dsebd.org/) and [Chittogong stock exchange](http://www.cse.com.bd/) website.

**check out demo: https://khyrulalam.github.io/DSE-CSE-Market-Update/.**


## Quick start

### Install

This package can be installed with:

- download the [latest release](https://github.com/khyrulAlam/DSE-CSE-Market-Update/archive/master.zip).

### Load

Put the required stylesheet at the [top](https://developer.yahoo.com/performance/rules.html#css_top) of your markup:

```html
<link rel="stylesheet" href="/dist/kakkuStyle.css" />
```
Or
```html
<link rel="stylesheet" href="/dist/kakkuStyle.min.css" />
```


Put the script at the [bottom](https://developer.yahoo.com/performance/rules.html#js_bottom):

```html
<script src="/dist/kakku.js"></script>
```
Or
```html
<script src="/dist/kakku.min.js"></script>
```

### Usage

It's a promiss base `function` so you can call the `function` then wait for `response` you data.

```js

//DSE market update
kakkuGetDSE().then(res=>{
  console.log(res);
})

//CSE market Update
kakkuGetCSE().then(res=>{
  console.log(res)
})

```


If you want the total stock update table use this `function`

```js
//DSE total table
kakkuGetDSEAll().then(res=>{
  console.log(res)
})

//CSE total table
kakkuGetCSEAll().then(res=>{
  console.log(res)
})
```

you can use default style template
```html
<div class="dse"></div>
<div class="cse"></div>
```
```js
kakkuGetDSE().then(res=>{
  TemplateDSE({
    data    : res,
    domEl   : '.dse',
  })
})
kakkuGetCSE().then(res=>{
  TemplateCSE({
    data        : res,
    domEl       : '.cse',
    bg          : '#115852',
    scrolldelay : 8
  })
})
```

**NOTE:** You can change [CROSS ORIGIN URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) and make request from your `server`. Make a php file `foo.php` and copy the code below in your `foo.php` file. Now change in `kakku.js` and `kakku.min.js` from `const CROSSURL = 'https://peaceful-mountain-17529.herokuapp.com/' ` to `const CROSSURL = 'foo.php';`

```php
<?php 
  if(!empty($_GET['url'])){
    $url = $_GET['url'];    
    print file_get_contents($url);
  }else{
   echo 'Something wrong with url';
  }
```

## Contributing

- [khayrulAlam](https://github.com/khyrulAlam).


## License

The code and the documentation are released under the [MIT License](LICENSE).
