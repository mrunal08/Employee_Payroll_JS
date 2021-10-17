let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
})

/**
 * Method read employee payroll data from local storage
 * @returns 
 */
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

/**
 * UC4,5 - Method for manupulating inner html of id table-display 
 */

const createInnerHtml = () => {
    localStorage.setItem("employeeData ",JSON.stringify(empPayrollData))
    const headerHtml = `
                        <th></th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Start Date</th>
                        <th>Action</th>`;

    if (empPayrollList.length == 0) return;

    let innerHtml = `${headerHtml}`
    for (const empPayrollData of empPayrollList) {
        innerHtml = ` ${innerHtml}
    <tr>
        <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${getDate(empPayrollData._startDate)}</td>
        <td>
            <img id="${empPayrollData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img id="${empPayrollData._id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

/**
 * converting numbers into date format.
 * @param {*} date :1577817000000
 * @returns : 3 - Jan - 2020
 */
const getDate = (date) => {
    let temp = date;
    const d = new Date(temp);
    const months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return d.getDate() + "  " + months[d.getMonth()] + "  " + d.getFullYear();
}

/**
 * Helper method for department column
 */
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}


/**
 * 
 * @returns Creating JSON object
 */
const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [{
            _name: 'Mrunal Gadhave',
            _gender: 'female',
            _department: [
                'Engineer'
            ],
            _salary: '500000',
            _StartDate: '08 June 2021',
            _note: '',
            _id: 1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'
        }
    ];
    return empPayrollListLocal;
}

const remove = (node) => {
    empPayrollList = empPayrollList.filter(emp => emp._id != node.id);
    storeDataToLocalStorage();
    createInnerHtml();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
}

const storeDataToLocalStorage = () => {
    localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
}