function loadtodos(){
    // to load todos from browser
    const todos=JSON.parse(localStorage.getItem("todos")) || {"todolist":[]};
    console.log(todos);
    return todos;
}

function refreshtodo(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}
function addtodotoloacalstorage(todo){
    const todos=loadtodos();
    todos.todolist.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}



function appendtodoinhtml(todotext){

    const todolist=document.getElementById("todolist");

    const todo=document.createElement("li");

    todo.setAttribute("data-id",todotext.id); 
    
    const textdiv=document.createElement("div");

    if(todotext.iscompleted){
        textdiv.classList.add("completed");
    }
    textdiv.textContent=todotext.text;
    todo.classList.add("todoItem");

    const wrapper=document.createElement("div");
    wrapper.classList.add("editbuttons");

    const deletebtn=document.createElement("button");
    deletebtn.textContent="DELETE";
    deletebtn.classList.add("DELETEbtn");

    deletebtn.addEventListener("click",deletetodo);

    const completebtn=document.createElement("button");
    completebtn.textContent=(todotext.iscompleted)?"RESET":"COMPLETE";
    completebtn.classList.add("COMPLETEDbtn");

    completebtn.addEventListener("click",toggletodo);

    const editbutton=document.createElement("button");
    editbutton.textContent="EDIT";
    editbutton.classList.add("EDITbtn");

    editbutton.addEventListener("click",edittodo);

    wrapper.appendChild(deletebtn);
    wrapper.appendChild(completebtn);
    wrapper.appendChild(editbutton);

    todo.appendChild(textdiv);
    todo.appendChild(wrapper);
    todolist.appendChild(todo);
    
}

function executefilteraction(event){
    const todolist=document.getElementById("todolist");
    const element=event.target;
    const value=element.getAttribute("data-filter");
    const todos=loadtodos();
    todolist.innerHTML='';

    
    if(value=="all"){
        console.log(todolist);
        todos.todolist.forEach(todo=>{
            appendtodoinhtml(todo);
        })

    }

    else if(value=="completed"){
        console.log(todolist);
        todos.todolist.forEach(todo=>{
            if(todo.iscompleted!=false){
                appendtodoinhtml(todo);
            }
        })
    }
    else{
        console.log(todolist);
        todos.todolist.forEach(todo=>{
            if(todo.iscompleted==false){
                appendtodoinhtml(todo);
            }
        })
    }
}

function resethtmltodos(todos){
    refreshtodo(todos);
    const todolist=document.getElementById("todolist");
    todolist.innerHTML='';
    todos.todolist.forEach(todo=>{
        appendtodoinhtml(todo);
    })
}

function edittodo(event){
    const todoitem=event.target.parentElement.parentElement;
    const todoid=todoitem.getAttribute("data-id");

    const todos=loadtodos();
    const response=prompt("what is the new todo value u want to set ?");
    todos.todolist.forEach(todo=>{
        if(todo.id==todoid){
            todo.text=response;
        }
    });
    refreshtodo(todos);
    resethtmltodos(todos);
}   

function deletetodo(event){
    const todoitem=event.target.parentElement.parentElement;
    const todoid=todoitem.getAttribute("data-id");

    const todos=loadtodos();
    todos.todolist=todos.todolist.filter(todo=>todo.id != todoid);

    resethtmltodos(todos);
}

function toggletodo(event){
    const todoitem=event.target.parentElement.parentElement;

    const todoid=todoitem.getAttribute("data-id");
    const todos=loadtodos();
    todos.todolist.forEach(todo=>{
        if(todo.id==todoid){
            todo.iscompleted=!todo.iscompleted;
        }
    })

    resethtmltodos(todos);
}

function submittodo(event){

        const todotext=todoinput.value;
        if(todotext===''){
            alert("Pease write something for input");
        }
        else{
            todos=loadtodos();
            addtodotoloacalstorage({text:todotext,iscompleted:false,id:todos.todolist.length});
            appendtodoinhtml({text:todotext,iscompleted:false,id:todos.todolist.length});
            todoinput.value='';
        }
}

document.addEventListener(("DOMContentLoaded"),()=>{
    const todoinput=document.getElementById("todoinput");

    const submitbutton=document.getElementById("Addtodo");

    let todos=loadtodos();

     
    const filterbutton=document.getElementsByClassName("filterBtn");
    for(const btn of filterbutton){
        
        btn.addEventListener("click",executefilteraction );
    }

    submitbutton.addEventListener("click",submittodo);

    todoinput.addEventListener("change",(event)=>{
        const todotext=event.target.value;
        event.target.value=todotext.trim();
        console.log(event.target.value);
    })

    todos.todolist.forEach(element => {
        appendtodoinhtml(element);
    });

    document.addEventListener("keypress",(event)=>{
        if(event.code=='Enter'){
            submittodo();
        }
    })

})

