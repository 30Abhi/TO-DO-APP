function loadtodos(){
    // to load todos from browser
    const todos=JSON.parse(localStorage.getItem("todos")) || {"todolist":[]};
    console.log(todos);
    return todos;
}

function addtodotoloacalstorage(todo){
    const todos=loadtodos();
    todos.todolist.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}



function appendtodoinhtml(todotext){
    const todolist=document.getElementById("todolist");

    const todo=document.createElement("li");

    const textdiv=document.createElement("div")
    textdiv.textContent=todotext.text;
    todo.classList.add("todoItem");


    const wrapper=document.createElement("div");
    wrapper.classList.add("editbuttons");

    const deletebtn=document.createElement("button");
    deletebtn.textContent="DELETE";
    deletebtn.classList.add("DELETEbtn");

    const completebtn=document.createElement("button");
    completebtn.textContent="COMPLETE";
    completebtn.classList.add("COMPLETEDbtn");

    wrapper.appendChild(deletebtn);
    wrapper.appendChild(completebtn);

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


document.addEventListener(("DOMContentLoaded"),()=>{
    const todoinput=document.getElementById("todoinput");

    const submitbutton=document.getElementById("Addtodo");

    const filterbutton=document.getElementsByClassName("filterBtn");
    for(const btn of filterbutton){
        
        btn.addEventListener("click",executefilteraction );
    }
    submitbutton.addEventListener("click",()=>{
        const todotext=todoinput.value;
        if(todotext===''){
            alert("Pease write something for input");
        }
        else{

            addtodotoloacalstorage({text:todotext,iscompleted:false});
            appendtodoinhtml({text:todotext,iscompleted:false});
            todoinput.value='';
        }
    })

    todoinput.addEventListener("change",(event)=>{
        const todotext=event.target.value;
        event.target.value=todotext.trim();
        console.log(event.target.value);
    })



    const initialtodos=loadtodos();
    initialtodos.todolist.forEach(element => {
        appendtodoinhtml(element);
    });
    
})

