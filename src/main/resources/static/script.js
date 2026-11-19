let editingEmployeeid=null
let currentPage=1;
let employeePerPage=5;
document.getElementById("employeeForm").addEventListener("submit",
    function(event){
        event.preventDefault();
        const employee={name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department:document.getElementById("department").value};
console.log(employee);
if (editingEmployeeid!=null)
    {
    fetch(`http://localhost:8080/employees/${editingEmployeeid}`,
    {
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(employee)
    })
    .then(response=>{
        if(!response.ok){
            throw new Error("update failed");
        }
        response.text()})
    .then(data=>
        {
            document.getElementsById("employeeform").reset();
            editingEmployeeid=null;
            document.querySelector("#employeeformbutton").innerText="SAVE EMPLOYEE";
            loadEmployees(); 
            showMessage("Employee updated successfully!");
            
    })
    .catch(error=>{
        console.error(error)
    });
    }
else
{
    fetch("http://localhost:8080/employees",
    {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(employee)
    })
    .then(response=>response.json())
    .then(data=>
        {
            loadEmployees();
            showMessage("Employee saved successfully!");
    })
    .catch(error=>{
        console.error(error)
    });
}
});
function loadEmployees()
{
    fetch(`http://localhost:8080/employees`).then(response=>response.json())
    .then(data=>{
       const tableBody=document.getElementById("employeeTableBody");
       tableBody.innerHTML="";
       const startIndex=(currentPage-1)*employeePerPage;
       const endIndex=startIndex+employeePerPage;
       const employeesToDisplay=data.slice(startIndex,endIndex)
       employeesToDisplay.forEach(employee => {
       const row=document.createElement("tr");
       row.innerHTML=`<td>${employee.id}</td><td>${employee.name}</td><td>${employee.email}</td><td>${employee.department}</td>
        <td><button onclick="editEmployee(${employee.id})">Edit</button>
        <button onclick="deleteEmployee(${employee.id})">Delete</button></td>`;
       tableBody.appendChild(row);
       });
    updatePagination(data.length);

    });
}
loadEmployees();
function deleteEmployee(id)
{  
    if(confirm("Are you sure you want to delete this employee?"))
    {
    fetch(`http://localhost:8080/employees/${id}`,{method:"DELETE"}).then(response=>{console.log("response:",response.status);});
    then(()=>{
        loadEmployees();
        showMessage("Employee deleted successfully!");
    });
    }

}
function editEmployee(id){
    editingEmployeeid=id;
    fetch(`http://localhost:8080/employees`).then(response=>response.json()).then(data=>{
        const employee=data.find(emp=> emp.id==id);
        if(employee){
            document.getElementById("name").value=employee.name;
            document.getElementById("email").value=employee.email;
            document.getElementById("department").value=employee.department;
            document.getElementById("#employeeformbutton").innerText="UPDATE EMPLOYEE";
        }
        

    })
}
function searchEmployees(){
    const searchText=document.getElementById("searchInput").value.toLowerCase();
    const rows=document.querySelectorAll("#employeeTableBody tr");
    rows.forEach(row=>{const employeeName=row.cells[1].innerHTML.toLowerCase();
        if (employeeName.includes(searchText)){
            row.style.display="";
        }
        else{
            row.style.display="none";
        }
    });
}
function showMessage(text)
{
    document.getElementById("message").innerHTML= text;
    setTimeout(()=>{document.getElementById("message").innerHTML= "";},3000);
}
function updatePagination(totalEmployees){
    const totalPages=Math.ceil(totalEmployees/employeePerPage);
    document.getElementById("pageInfo").innerHTML=`Page${currentPage} of Page${totalPages} `;
    document.getElementById("prevBtn").disabled=currentPage==1;
    document.getElementById("nextBtn").disabled=currentPage>=totalPages;
}
function nextPage(){
    currentPage++;
    loadEmployees();
}
function previousPage()
{
    if(currentPage>1)
        {
            currentPage--;
            loadEmployees();
        }
   
}