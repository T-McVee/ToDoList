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
  const app = appLoad(myLists);
  domElements.content.appendChild(welcomeScreen);

  // Sign in / sign out function - temporay 
  let signedIn = false;
  const demoButton = navbar.querySelector('#logout');
  demoButton.addEventListener('click', () => {

    auth.signOut();
    /* if (!signedIn) {
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
      auth.signOut();
      const app = domElements.content.querySelector('.app');
      app.remove();
      domElements.content.appendChild(welcomeScreen);
      demoButton.textContent = 'start demo';
    }

    signedIn = !signedIn; */
  });

  // New account sign up
  const signUpButton = document.querySelector('#sign-up');
  const signInButton = document.querySelector('#sign-in');
  const form = document.querySelector('form');

  signUpButton.addEventListener('click', () => {
    auth.createUserWithEmailAndPassword(form.email.value, form.password.value);
  });

  signInButton.addEventListener('click', () => {
    auth.signInWithEmailAndPassword(form.email.value, form.password.value);
  });

  auth.onAuthStateChanged(user => {



    if (user) {
      //signed in
      domElements.content.removeChild(welcomeScreen);
      domElements.content.appendChild(app);
    } else {
      //signed out
      domElements.content.removeChild(app);
      domElements.content.appendChild(welcomeScreen);
    }
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