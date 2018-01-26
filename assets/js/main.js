// START : TAG SUPPORT CODE
function filter (tag) {
  var selectedTags = document.getElementsByClassName('tag-link-' + tag);
  //console.log(selectedTags[0]);
  if (selectedTags[0]) {
    // If selected tag has been selected already then un-select it & show all posts
    if (selectedTags[0].getAttribute('class').indexOf('selectedFilter') > -1) {
        window.location.hash = '';
        //console.log('found');
        showAllRows();
        selectedTags[0].setAttribute('class', selectedTags[0].getAttribute('class').replace('selectedFilter', '').trim());
    } else {
        window.location.hash = tag;
        var previousSelectedTags = document.getElementsByClassName('selectedFilter');
        if (previousSelectedTags[0]) {
            //console.log('found other');
            previousSelectedTags[0].setAttribute('class', previousSelectedTags[0].getAttribute('class').replace('selectedFilter', '').trim());
        }
       // console.log('not found');
        selectedTags[0].setAttribute('class', selectedTags[0].getAttribute('class') + ' selectedFilter');
        hideAllTagRows();
        showSelectedTagRow(tag);
    }
  }
}

function hideAllTagRows() {
  var lists = document.getElementsByClassName('tagRow');
  for (var i = 0; i < lists.length; i++) {
    //console.log('hideAllTagRows get', lists[i].getAttribute('class'));
    //console.log('hideAllTagRows set', 'hiddenTag ' + lists[i].getAttribute('class').replace('hiddenTag', '').trim());
    lists[i].setAttribute('class', 'hiddenTag ' + lists[i].getAttribute('class').replace('hiddenTag', '').trim());
  }
}
function showSelectedTagRow(tag) {
  var lists = document.getElementsByClassName(tag);
  for (var i = 0; i < lists.length; i++) {
    //console.log('showSelectedTagRow get', lists[i].getAttribute('class'));
    //console.log('showSelectedTagRow set', lists[i].getAttribute('class').replace('hiddenTag', '').trim());
    lists[i].setAttribute('class', lists[i].getAttribute('class').replace('hiddenTag', '').trim());
  }
}
function showAllRows() {
  var lists = document.getElementsByClassName('tagRow');
  for (var i = 0; i < lists.length; i++) {
    //console.log('showHiddenRows get', lists[i].getAttribute('class'));
    //console.log('showHiddenRows set', lists[i].getAttribute('class').replace('hiddenTag', '').trim());
    lists[i].setAttribute('class', lists[i].getAttribute('class').replace('hiddenTag', '').trim());
  }
}
// Get posts of specific tag via url hash
// JS hack since github pages does not support tag based pages easily
var hashValue = window.location.hash.replace('#', '').trim();
if (hashValue.length > 0) {
  setTimeout(function() {
    filter(hashValue);
  }, 10); 
}
// END : TAG SUPPORT CODE

function processSearchInput(e) {
    let search = document.getElementById('search');
    if (search.value && 13 == e.keyCode) {
        window.location = "/search?q=" + search.value;
    }
}
function displaySubscribePopup() {
    console.log('displaySubscribePopup');
    document.getElementById('subscribe_div').innerHTML = '<script type="text/javascript" src="http://downloads.mailchimp.com/js/signup-forms/popup/embed.js" data-dojo-config="usePlainJson: true, isDebug: false"></script><script type="text/javascript">require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us17.list-manage.com","uuid":"23a87a72b8243c8453340dc3f","lid":"8b2b833d93"}) })</script>';
}