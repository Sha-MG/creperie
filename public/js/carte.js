const carte = {

    init: async function() {
        carte.handleCardClick()
    },

    handleCardClick: function(){

        const croix = document.querySelectorAll('i.fa-plus') ;

        for(const chaqueCroix of croix){

            chaqueCroix.addEventListener('click', (event)=>{

                let value = event.currentTarget.closest('article')
                value = value.getAttribute("value")
                console.log(value)


            })
        }


    }

};

document.addEventListener('DOMContentLoaded', carte.init);
