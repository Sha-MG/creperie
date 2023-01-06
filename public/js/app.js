import profil from './profil.js';

const app = {
  init: function () {

    profil.init();

  },
};


document.addEventListener('DOMContentLoaded', app.init);
