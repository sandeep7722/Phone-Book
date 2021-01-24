const tableKey = 'cms-table';
let cmsTable;
let cmsTableDemo = {};


let enableDisableNameInput = (option) => {
    let newPersonName = document.getElementById('newPersonName');
    if(option === 'enable')
        newPersonName.disabled = false;
    else if (option === 'disable')
        newPersonName.disabled = true;
}

let refreshTable = () => { 
    let cmsTableKeys = Object.keys(cmsTable);
    let tableContaier = document.getElementById('cmsTableContainer');
    let oldTableBody = document.getElementById('tableBody');
    tableContaier.removeChild(oldTableBody);
    let newTableBody = document.createElement('span');
    newTableBody.id = 'tableBody';
    tableContaier.appendChild(newTableBody);
    

    for(let i = 0; i < cmsTableKeys.length;i++){
        let currentRow = document.createElement('div');
        let currentNameCol = document.createElement('div');
        let currentPhoneCol = document.createElement('div');
        let currentEmailCol = document.createElement('div');
        let currentEditBtn = document.createElement('div');
        let currentDeleteBtn = document.createElement('div');


        currentRow.className = 'cm-table-row';
        currentNameCol.className = 'cm-table-column cm-name';
        currentPhoneCol.className = 'cm-table-column cm-phone';
        currentEmailCol.className = 'cm-table-column cm-email';
        currentEditBtn.className = 'cm-table-column cm-edit';
        currentDeleteBtn.className = 'cm-table-column cm-delete';

        currentNameCol.innerHTML = cmsTableKeys[i];
        currentPhoneCol.innerHTML = cmsTable[cmsTableKeys[i]].phone;
        currentEmailCol.innerHTML = cmsTable[cmsTableKeys[i]].email;

        currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        currentEditBtn.innerHTML = '<i class="fas fa-user-edit"></i>';

        currentRow.appendChild(currentNameCol);
        currentRow.appendChild(currentPhoneCol);
        currentRow.appendChild(currentEmailCol);
        currentRow.appendChild(currentEditBtn);
        currentRow.appendChild(currentDeleteBtn);
        newTableBody.appendChild(currentRow);
    }

    let enableDisableNewUserModal = (option) => {
        let newPersonName = document.getElementById('newPersonName');
        let newPersonPhone = document.getElementById('newPersonPhone');
        let newPersonEmail = document.getElementById('newPersonEmail');
        newPersonName.value = '';
        newPersonPhone.value = '';
        newPersonEmail.value = '';

        let newPersonModal = document.getElementById('newPersonModal');
        let backdrop = document.getElementById('backdrop');

        newPersonModal.className = `${option}-modal`;
        backdrop.className = `${option}-modal`;
    }
    let addNewEntryBtn = document.getElementById('cmAddNewEntry');
    let editBtns = document.getElementsByClassName('cm-edit');
    let deleteBtns = document.getElementsByClassName('cm-delete');

    let newPersonSubmitBtn = document.getElementById('newPersonSubmitButton');
    let newPersonCancelBtn = document.getElementById('newCancelButton');

    newPersonSubmitBtn.addEventListener('click', () => {
        let newPersonName = document.getElementById('newPersonName').value.trim();
        let newPersonEmail= document.getElementById('newPersonEmail').value.trim();
        let newPersonPhone = document.getElementById('newPersonPhone').value.trim();
        if(newPersonName === '')
            document.getElementById('newPersonName').className = 'input-err';
        else 
            document.getElementById('newPersonName').className = '';

        if(newPersonPhone === '')
            document.getElementById('newPersonPhone').className = 'input-err';
        else 
            document.getElementById('newPersonPhone').className = '';

        if(newPersonEmail === '')
            document.getElementById('newPersonEmail').className = 'input-err';
        else 
            document.getElementById('newPersonEmail').className = '';
        
        if(newPersonName !== '' && newPersonEmail !== '' && newPersonPhone !== ''){
            cmsTable[newPersonName] = {
                'phone': newPersonPhone,
                'email': newPersonEmail
            }
            localStorage.setItem(tableKey,JSON.stringify(cmsTable));
            enableDisableNewUserModal('disable');
            refreshTable();
        }
    });
    newPersonCancelBtn.addEventListener('click', () =>{
        enableDisableNewUserModal('disable');
    });
    addNewEntryBtn.addEventListener('click', () => {
        enableDisableNewUserModal('enable');
    });

    for(let i = 0; i < editBtns.length; i++){
        editBtns[i].addEventListener('click', ($event) => {
            let nameToEdit = $event.target.parentElement.children[0].innerText;
            let personToEdit = cmsTable[nameToEdit];
            enableDisableNameInput('enable');
            enableDisableNewUserModal('enable');
            let newPersonName = document.getElementById('newPersonName');
            let newPersonPhone = document.getElementById('newPersonPhone');
            let newPersonEmail = document.getElementById('newPersonEmail');
            newPersonName.value = nameToEdit;
            newPersonPhone.value = personToEdit.phone;
            newPersonEmail.value = personToEdit.email;
            
        })
    }
    for(let i = 0; i < deleteBtns.length; i++){
        deleteBtns[i].addEventListener('click', ($event) => {
            let nameToDelete = $event.target.parentElement.children[0].innerText;
            let isSure = window.confirm('Are you sure you want to delete ' + nameToDelete + '?');
            if(isSure)
                // delete user from table
                deleteUserFromTable(nameToDelete);
        })
    }

}

let deleteUserFromTable = (userName) => {
    let tempTable = {};
    let cmsTableKeys = Object.keys(cmsTable);
    for(let i = 0; i < cmsTableKeys.length; i++){
        if(userName !== cmsTableKeys[i]){
            tempTable[cmsTableKeys[i]] = cmsTable[cmsTableKeys[i]]; 
        }
    }
    cmsTable = tempTable;
    localStorage.setItem(tableKey,JSON.stringify(cmsTable));
    refreshTable();
}
let init = () => {
    if(localStorage.getItem(tableKey)){
        cmsTable = JSON.parse(localStorage.getItem(tableKey));
    } else {
        cmsTable = cmsTableDemo;
        localStorage.setItem(tableKey,JSON.stringify(cmsTable));
    }
    refreshTable();
}
init();