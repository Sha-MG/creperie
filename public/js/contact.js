const contact = {

    init: async function() {
        contact.handleSubmit()
        // contact.handleCroixClick()
    },

    // handleCroixClick: function(){

    //     const croix = document.querySelector('.fa-xmark') ;

    //     croix.addEventListener('click', (event) => {
    //         let div = event.currentTarget.closest('.messageCommandeAdd')
    //         div.remove()
    //     })

    // },

    handleSubmit : function(){

        const submitButton = document.querySelector('.button')
        const divPrincipale = document.getElementById('contactContainer')
        const contactInfo = document.querySelector('.contactInfos')
        const divMessage = document.createElement('div')
        const pMessage = document.createElement('p')
        const croix = document.createElement('i')
        
        console.log(contactInfo)
        submitButton.addEventListener('click', () => {

            divPrincipale.insertBefore(divMessage, contactInfo);
            let divCree = divPrincipale.querySelector('div')
            divCree.classList.add('message')

            divCree.appendChild(pMessage)
            let pCree = divCree.querySelector('p')
            
            pCree.textContent = "Votre message à bien été envoyé ! (Enfin pas vraiment, je vous rappelle que c'est un site fictif héhé)"

            divCree.appendChild(croix)
            let croixCree = divPrincipale.querySelector('i')
            croixCree.classList.add('fa-solid', 'fa-xmark', 'fa-2xl', 'croix')
            croixCree.addEventListener('click', () => {
                divCree.remove()
            })

        })
    }

};

document.addEventListener('DOMContentLoaded', contact.init);