const xhr=new XMLHttpRequest();

xhr.addEventListener('load', () => {
  xhr.response;
});

// xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send();


