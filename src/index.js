import { appLoad, welcomeLoad } from './pageLoad';
import { renderNavBar } from './render';
import { createList } from './list';
import { storageAvailable } from './helpers/functions';
// import datepicker from '../node_modules/js-datepicker/dist/datepicker.min';
import datepicker from 'js-datepicker';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// Firebase setup
const firebaseConfig = {
  apiKey: 'AIzaSyBoS-cof4C5LSSQRs7m6y0WzNEbuueljIY',
  authDomain: 'list-lab-53900.firebaseapp.com',
  projectId: 'list-lab-53900',
  storageBucket: 'list-lab-53900.appspot.com',
  messagingSenderId: '474269545281',
  appId: '1:474269545281:web:33e5501e63cbcc933667c0',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();

const domElements = {
  content: document.querySelector('#content'),
};

// Todo lists
const myLists = [];
const currentUser = {
  id: '',
};

const init = (() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // signed in
      currentUser.id = user.uid;

      // check for local storage
      if (storageAvailable('localStorage')) {
        if (!localStorage[`projects-${currentUser.id}`]) {
          updateLocalStorage();
        } else {
          setLists();
        }
      } else {
        console.log('no localStorage');
      }

      // Render dom elements
      const app = appLoad(myLists);
      domElements.content.removeChild(welcomeScreen);
      domElements.content.appendChild(app);
      signOutButton.textContent = 'sign out';
      signOutButton.style.display = 'flex';
      setTimeout(() => form.reset(), 1);

      // Add Date Picker to existing tasks
      const listEls = Array.from(document.querySelectorAll('.list'));
      const taskEls = Array.from(
        listEls.map((list) => Array.from(list.querySelectorAll('.task')))
      );

      taskEls.forEach((list, listIndex) => {
        list.forEach((task, taskIndex) => {
          const dateEl = task.querySelector('.due-date');

          const picker = datepicker(dateEl, {
            onHide: () => {
              if (!picker.dateSelected) return;
              myLists[listIndex].tasks[
                taskIndex
              ].dueDate = picker.dateSelected.toDateString();
              dateEl.textContent = myLists[listIndex].tasks[taskIndex].dueDate;
              updateLocalStorage();
            },
          });
        });
      });
    } else {
      // signed out
      const app = domElements.content.querySelector('.app');
      if (app) domElements.content.removeChild(app);
      currentUser.id = '';
      myLists.length = 0;
      domElements.content.appendChild(welcomeScreen);
      signOutButton.style.display = 'none';
    }
  });

  // Navbar
  const navbar = renderNavBar('');
  domElements.content.appendChild(navbar);

  // Init welcome screen
  const welcomeScreen = welcomeLoad();
  domElements.content.appendChild(welcomeScreen);

  // DOM elements
  const form = document.querySelector('form');
  const signUpButton = document.querySelector('#sign-up');
  const signInButton = document.querySelector('#sign-in');
  const signOutButton = navbar.querySelector('#logout');

  // New account sign up
  signUpButton.addEventListener('click', () => {
    createUserWithEmailAndPassword(auth, form.email.value, form.password.value);
  });

  // Sign in
  signInButton.addEventListener('click', () => {
    signInWithEmailAndPassword(auth, form.email.value, form.password.value)
      .then()
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Invalid email/password combination');
        } else if (errorCode === 'auth/user-not-found') {
          alert('No account found. Please use sign up button');
        } else {
          alert(errorMessage);
        }
      });
  });

  // Sign out
  signOutButton.addEventListener('click', () => {
    auth
      .signOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  });
})();

/* Local Storage */

// Save myLists to local storage
function updateLocalStorage() {
  localStorage.setItem(`projects-${currentUser.id}`, JSON.stringify(myLists));
}

// retrieve myLists from local storage
function setLists() {
  const storageItem = JSON.parse(
    localStorage.getItem(`projects-${currentUser.id}`)
  );

  storageItem.forEach((item) => {
    const list = createList(item);
    myLists.push(list);
  });
}

export { myLists, updateLocalStorage };
