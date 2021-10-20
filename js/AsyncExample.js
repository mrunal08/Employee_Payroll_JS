
function getEmployeePayrollDataFromServer(){
    var xhr = new XMLHttpRequest();   //Ready State value will be 0
    var async = true;
    const URL = "http://localhost:3000/EmployeePayrollDB"
    xhr.open("GET",URL,async)        //Open method has been invoked and ready state value will be 1
    xhr.send();                      //send method invoked and ready state value will be 2
}

function makeAJAXCall(methodType,URL,callback,async,data=null){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        console.log("Ready state change method called.Ready State : "+xhr.readyState + " Status: "+xhr.status);

        if(xhr.readyState===4){
            if(xhr.status===200 || xhr.status===201){   //200->OK ,201->Create
                callback(xhr.responseText);
            }
            else if(xhr.status===400){
                console.log("something went wrong!!")
            }
        }
    }
    xhr.open(methodType,URL,async);
    xhr.send();
    console.log(methodType + "request sent to server")
}

function getEmployeeDetails(data){
console.log("Get employeee data : "+data);
}
const getURL = "http://localhost:3000/EmployeePayrollDB"

makeAJAXCall("GET",getURL,getEmployeeDetails)

const employeeData={
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
function newEmployee(data){
    console.log("Employee Added : "+data);
    }

makeAJAXCall("POST",newEmployee(),employeeData)




/*
Notes:
*Method TYpe=> GET,POST,PUT,DELETE
xhr ->readyState and status

0----->UNSET
1----->OPened
2----->Headers_received/SEND
3----->LOADING
4----->DONE

*/