import { appLoad, welcomeLoad } from './pageLoad'
import { renderNavBar } from './render'
import { createList } from './list'
import datepicker from '../node_modules/js-datepicker/dist/datepicker.min.js'

const domElements = {
  content: document.querySelector('#content')
};

const myLists = [];

//localStorage.removeItem('projects');
const init = (() => {
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

  // Navbar
  const navbar = renderNavBar('');
  domElements.content.appendChild(navbar);

  const welcomeScreen = welcomeLoad();
  domElements.content.appendChild(welcomeScreen);

  // Sign in / sign out function - temporay 
  let signedIn = false;
  const demoButton = navbar.querySelector('#logout');
  demoButton.addEventListener('click', () => {
    if (!signedIn) {
      welcomeScreen.remove();
      domElements.content.appendChild(appLoad(myLists));
      demoButton.textContent = 'sign out';

      // Add Date Picker to existing tasks
      const listEls = Array.from(document.querySelectorAll('.list'));
      const taskEls = Array.from(listEls.map(list =>
        Array.from(list.querySelectorAll('.task'))));

      taskEls.forEach((list, listIndex) => {
        list.forEach((task, taskIndex) => {
          const dateEl = task.querySelector('.due-date');

          const picker = datepicker(dateEl, {
            onHide: () => {
              if (!picker.dateSelected) return;
              myLists[listIndex]
                .tasks[taskIndex]
                .dueDate = picker.dateSelected.toDateString();
              dateEl.textContent = myLists[listIndex].tasks[taskIndex].dueDate;
              updateLocalStorage();
            }
          });
        });
      });

    } else {
      const app = domElements.content.querySelector('.app');
      app.remove();
      domElements.content.appendChild(welcomeScreen);
      demoButton.textContent = 'start demo';
    }

    signedIn = !signedIn;
  });
})();

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    let x = '__storage_test__';
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
  //console.log('POPULATE STORAGE:');
  localStorage.setItem('projects', JSON.stringify(myLists));
  //console.log(`Update: `, myLists);
}

// retrieve myLists from local storage
function setLists() {
  console.log('SET LISTS:');
  const storageItem = JSON.parse(localStorage.getItem('projects'));
  //console.log('StorageItem:');
  //console.log(storageItem);

  storageItem.forEach(item => {
    const list = createList(item);
    myLists.push(list);
  });
  console.log(myLists);
}

export { myLists, updateLocalStorage };