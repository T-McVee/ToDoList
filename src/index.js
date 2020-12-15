import { pageLoad } from './pageLoad';
import { createList } from './list'
import { createTask } from './task';

const domElements = {
  content: document.querySelector('#content')
};

const myLists = [];

const init = (() => {
  //localStorage.removeItem('projects');
  if (storageAvailable('localStorage')) {
    if (!localStorage.projects) {
      updateLocalStorage();
    } else {
      setLists();
    }
  }
  else {
    console.log('no localStorage');
  }
  domElements.content.appendChild(pageLoad(myLists));


  /* const picker = datepicker(el, {
      onHide: () => {
        if (!picker.dateSelected) return;
        listData.dueDate = picker.dateSelected.toDateString();
        el.textContent = listData.dueDate;
        updateLocalStorage();
      }
    }) */
})();


function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

// Save myLists to local storage
function updateLocalStorage() {
  console.log('POPULATE STORAGE:');
  localStorage.setItem('projects', JSON.stringify(myLists));
  console.log(localStorage);
}

// retrieve myLists from local storage
function setLists() {
  console.log('SET LISTS:');
  const storageItem = JSON.parse(localStorage.getItem('projects'));
  storageItem.forEach(item => {
    const list = createList(item);
    item.tasks.map(task => createTask(task));
    myLists.push(list);
  });
  console.log(myLists);
}


export { myLists, updateLocalStorage };