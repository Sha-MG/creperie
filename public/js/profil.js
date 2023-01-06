const profil = {

    init: async function() {
        profil.handleModifyClick()
    },
    
    handleModifyClick : function(){
        
        const modifyButton = document.getElementById('modifyButton')
        const forms = document.querySelectorAll('.modifyForm')
        const profilList = document.querySelectorAll('.modifyInput')
        const saveButton = document.getElementById('saveButton')

        modifyButton.addEventListener('click', (event)=>{
            event.preventDefault()
            console.log('Hello')
            for(const form of forms){
            form.classList.remove('d-none')
            }

            for(const list of profilList){
            list.classList.add('d-none')
            }

            modifyButton.classList.add('d-none')
            saveButton.classList.remove('d-none')
            
        })
    },


};


document.addEventListener('DOMContentLoaded', profil.init);