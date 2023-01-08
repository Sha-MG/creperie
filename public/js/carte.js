const carte = {

    init: async function() {
        carte.handleCroixClick()
    },

    handleCroixClick: function(){

        const croix = document.querySelector('.fa-xmark') ;

        croix.addEventListener('click', (event) => {
            let div = event.currentTarget.closest('.messageCommandeAdd')
            div.remove()
        })

    }

};

document.addEventListener('DOMContentLoaded', carte.init);
