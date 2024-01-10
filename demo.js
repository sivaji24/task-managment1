    let taskList = [];
 
    function showNewTaskForm() {
      document.getElementById("newTaskForm").style.display = "block";
      
    }
  
    function removeSelectedTasks() {
      const checkboxes = document.querySelectorAll(".task-checkbox");
      const selectedIndexes = [];
  
      checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
          selectedIndexes.push(index);
        }
      });

      // Remove tasks in reverse order to avoid index issues
      for (let i = selectedIndexes.length - 1; i >= 0; i--) {
        taskList.splice(selectedIndexes[i], 1);
      }
  
      updateTaskTable();
      
    }
  
    function exportTasks() {
      // Add functionality to export tasks
    }
   
    function submitTask() {
      const task = document.getElementById("task").value;
      const story = document.getElementById("story").value;
      const assignee = document.getElementById("assignee").value;
      const priority = document.getElementById("priority").value;
      const startDate = document.getElementById("start_date").value;
      const endDate = document.getElementById("end_date").value;
      const spendTime = document.getElementById("spend_time").value;
      const status = document.getElementById("status").value;
      const taskStory = `${task} {${story}}`;


      if (!task || !spendTime|| !startDate||!endDate||!assignee) {
        alert("All fields are required!");
        return;}
  
      const newTask = {
        taskStory,
        assignee,
        priority,
        start_date: startDate,
        end_date: endDate,
        spend_time: spendTime,
        status, 
      };
      taskList.push(newTask);
       updateTaskTable();
  
      clearForm();
    }


    function updateTaskTable() {
      const tableBody = document.getElementById("taskList");
      tableBody.innerHTML = "";
      console.log(tableBody);
  
      taskList.forEach((task, index) => {
        const row = tableBody.insertRow();
  console.log(row);
        // Checkbox in the first cell
        const checkboxCell = row.insertCell();
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkboxCell.appendChild(checkbox);
        
  
        // Other task fields starting from the second cell
        for (const key in task) {
          const cell = row.insertCell();
          let ceel = cell.appendChild((document.createElement("p")));
         
          ceel.appendChild((document.createTextNode(task[key])));
          

        }
        
  
        //////////////////////////////// Add class based on priority for styling


 
        row.classList.add(getPriorityClass(task.priority));
        row.classList.add(getStatusClass(task.status));

      
      });
      
    }
 
      
   
    function getPriorityClass(priority) {
      switch (priority) {
        case "high":
          return "high-priority";
        case "medium":
          return "medium-priority";
        case "low":
          return "low-priority";
        default:
          return "";
      }
    }

    function getStatusClass(status) {
      switch (status) {
        case "pending":
          return "pending-status";
        case "progress":
          return "progress-status";
        case "completed":
          return "completed-status";
          case "open":
          return "open-status";
        default:
          return "";
      }
    }
 
    function clearForm() {
      document.getElementById("taskForm").reset(" ");
      document.getElementById("newTaskForm").style.display = "none";

    }
    function cancelForm(){
      document.getElementById("newTaskForm").style.display = "none";
    }

    // Initialize the table with any existing tasks
    updateTaskTable();
  



    //search...
    document.getElementById('taskSearch').addEventListener('input', function() {
      searchTable(this.value);
  });
  
  function searchTable(query) {
      query = query.toLowerCase();
      const table = document.getElementById('taskTable');
      
      const rows = table.getElementsByTagName('tr');
  
      for (let row of rows) {
          const cells = row.getElementsByTagName('td');
          let found = false;
  
          for (let cell of cells) {
              if (cell.textContent.toLowerCase().includes(query)) {
                  found = true;
                 
              }
          }
      
          if (found) {
              row.style.display = '';
           
            

          } else {
              row.style.display = 'none';
              table.style.display='';
          }
      }
       
  }


 