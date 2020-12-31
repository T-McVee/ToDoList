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

  // init welcome screen
  const welcomeScreen = welcomeLoad();
  const app = appLoad(myLists);
  domElements.content.appendChild(welcomeScreen);

  //DOM elements
  const form = document.querySelector('form');
  const signUpButton = document.querySelector('#sign-up');
  const signInButton = document.querySelector('#sign-in');
  const signOutButton = navbar.querySelector('#logout');

  // New account sign up
  signUpButton.addEventListener('click', () => {
    auth.createUserWithEmailAndPassword(form.email.value, form.password.value);

    auth.onAuthStateChanged(user => {

      db.collection('users').add({
        uid: user.uid,
        name: form.name.value,
      });
      form.reset();

    });

  });

  // Sign in
  signInButton.addEventListener('click', () => {

    auth.signInWithEmailAndPassword(form.email.value, form.password.value)
      .catch((error) => {

        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == 'auth/wrong-password') {
          alert('Invalid email/password combination');
        } else {
          alert(errorMessage);
        }
        console.log(error);

      });
  });

  // Sign out
  signOutButton.addEventListener('click', () => {
    auth.signOut();
    domElements.content.removeChild(app);
  });

  auth.onAuthStateChanged(user => {

    if (user) {
      //signed in
      domElements.content.removeChild(welcomeScreen);
      domElements.content.appendChild(app);
      signOutButton.textContent = 'sign out';
      signOutButton.style.display = 'flex';
      setTimeout(() => form.reset(), 1);
    } else {
      //signed out
      domElements.content.appendChild(welcomeScreen);
      signOutButton.style.display = 'none';
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