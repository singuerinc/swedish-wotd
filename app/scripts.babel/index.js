'use strict';

let wordIndex;

function initApp(today, word, json){
  new Vue({
    el: '#app',
    data: {
      word: {
        main: word,
        tr: json.def[0] ? json.def[0].tr[0].text : ''
      }
    },
    methods: {
      newWord: () => {
        let date = new Date(),
          today = date.getFullYear() + '' + date.getMonth() + '' + date.getDate();
        localStorage.removeItem(today);
        window.location.reload();
      }
    }
  });

  localStorage.setItem(today, JSON.stringify({
    word: word,
    json: json
  }));
}

chrome.runtime.getPackageDirectoryEntry((root) => {

  let date = new Date(),
    today = date.getFullYear() + '' + date.getMonth() + '' + date.getDate(),
    data = localStorage.getItem(today);
  if(data != null){
    let parsed = JSON.parse(data);
    initApp(today, parsed.word, parsed.json);
  } else {
    root.getFile('file:///../google-10000-english.txt', {}, function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          var wordArray = this.result.split('\n');
          wordIndex = Math.floor(Math.random() * wordArray.length);
          let word = wordArray[wordIndex];

          var xhr = new XMLHttpRequest();
          xhr.onload = function() {
              var json = xhr.responseText;                         // Response
              json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
              json = JSON.parse(json);                             // Parse JSON

              initApp(today, word, json);
          };

          let text = word,
            lang = 'en-sv',
            key = 'dict.1.1.20160812T233806Z.789b93880ae42c8b.b812e6901ba41a3b8307abddebbc324b7afb0707';
          xhr.open('GET', 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key='+key+'&lang='+lang+'&text='+text);
          xhr.send();

        };
        reader.readAsText(file);
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }
});
