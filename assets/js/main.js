function filter (tag) {
  var selectedTags = document.getElementsByClassName('tag-link-' + tag);
  //console.log(selectedTags[0]);
  if (selectedTags[0]) {
    if (selectedTags[0].getAttribute('class').indexOf('selectedFilter') > -1) {
        //console.log('found');
        showAllRows();
        selectedTags[0].setAttribute('class', selectedTags[0].getAttribute('class').replace('selectedFilter', '').trim());
    } else {
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