
const theme = document.getElementById('theme');
const newitem =document.getElementById('additem');
const todolist = document.querySelector('.content ul');
const itemlist =  document.querySelector('.items-left span');
const clear = document.querySelector('.clear-completed');

itemlist.innerText = document.querySelectorAll(' .list-item input[type="checkbox"]').length;
//to change theme from defalut dark to light
theme.addEventListener('click', ()=>{
    document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark']
});

// to add a new todo when Enter or space bar press
additem.addEventListener('keypress',(e)=>{
    if((e.charCode === 13)  && (newitem.value.length > 0) ){
        createNewTodo(newitem.value);
        newitem.value = '';
    }
});
  function  createNewTodo(text){
       const elem = document.createElement('li');
         elem.classList = ['flex-row drag-item'];
         elem.draggable = true;
       elem.innerHTML = ` <label class="list-item">
       <input type="checkbox" name="todoitem">
       <span class="checkmark"></span>
       <span class="text">${text}</span>      
     </label>
     <span class="remove"></span>
`;
    if(document.querySelector('.filter input[type = "radio"]:checked').id === 'completed'){
               elem.classList.add('hidden');          
    }
         todolist.append(elem);
         updatecount(1);
  }

  //to update count of todo when add new.
 function updatecount(number){
     itemlist.innerText = +itemlist.innerHTML + number;
 }  


 // to remove todo item
 function removetodoitem(elem){
    elem.remove();
    updatecount(-1);
 }
 todolist.addEventListener('click',(event) =>{
    if(event.target.classList.contains('remove')){
        removetodoitem(event.target.parentElement);
    }
 })

 clear.addEventListener('click',() =>{
      document.querySelectorAll(' .list-item input[type="checkbox"]:checked ').forEach(item=>{
        removetodoitem(item.closest('li'));
      });
 });



 //to filter todo list

 document.querySelectorAll('.filter input').forEach(radio =>{
    radio.addEventListener('change',(e)=>{
        filtertodoItems(e.target.id);
    });
 });

 function filtertodoItems(id){
     const allitems = todolist.querySelectorAll('li');

      switch(id){
         case 'all':
          allitems.forEach(item=>{
            item.classList.remove('hidden');
          })
            break;
        case 'active':
             allitems.forEach(item=>{
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
             })
             break;
           default:
            allitems.forEach(item=>{
                item.querySelector('input').checked ? item.classList.remove('hidden') : item.classList.add('hidden');
            })
            break;
      }
 }

 //for drag and drop todo list

 todolist.addEventListener('dragstart', (event)=>{
    event.target.classList.add('draggable-element');
 });

 todolist.addEventListener('dragend', (event)=>{
    event.target.classList.remove('draggable-element');
 });

 todolist.addEventListener('dragover', (event)=>{
      event.preventDefault();

      const dragElement = document.querySelector('.draggable-element');
      const currentElement = event.target;

      const cansort = dragElement !== currentElement && currentElement.classList.contains('drag-item');

      if(!cansort) {return ;}
      const nextElement = (currentElement === dragElement.nextElementSibling) ? currentElement.nextElementSibling : currentElement;
    
      if(nextElement && dragElement === nextElement.previousElementsibling || dragElement === nextElement){
        return;
      }
      todolist.insertBefore(dragElement,nextElement);  
 });

 const getnextElement = (cursorPosition,currentElement)=>{
    const currentElementCordinate = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCordinate.y + currentElementCordinate.height /2;

    return (cursorPosition < currentElementCenter) ? currentElement : currentElement.nextElementSibling;
 }