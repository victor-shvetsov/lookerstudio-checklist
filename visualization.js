/**
 * Custom Looker Studio To-Do List Visualization
 *
 * Features:
 * - Displays tasks dynamically from Looker Studio data
 * - Allows check/uncheck interaction with localStorage persistence
 * - Strikes out or removes completed tasks
 */

display = (data, element) => {
    element.innerHTML = ""; // Clear existing content
    
    let taskList = document.createElement("ul");
    taskList.style.listStyleType = "none";
    taskList.style.padding = "0";
    
    data.forEach(row => {
        let task = row["Task"]; // Ensure "Task" column exists in Looker Studio dataset
        let taskId = "task-" + btoa(task).replace(/=/g, ""); // Unique ID
        let isChecked = localStorage.getItem(taskId) === "true";
        
        let listItem = document.createElement("li");
        listItem.style.display = "flex";
        listItem.style.alignItems = "center";
        listItem.style.marginBottom = "8px";
        
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isChecked;
        checkbox.style.marginRight = "10px";
        
        let label = document.createElement("label");
        label.textContent = task;
        label.style.fontSize = "16px";
        label.style.cursor = "pointer";
        label.style.transition = "opacity 0.3s";
        
        if (isChecked) {
            label.style.textDecoration = "line-through";
            label.style.color = "gray";
        }
        
        checkbox.addEventListener("change", () => {
            localStorage.setItem(taskId, checkbox.checked);
            if (checkbox.checked) {
                label.style.textDecoration = "line-through";
                label.style.color = "gray";
            } else {
                label.style.textDecoration = "none";
                label.style.color = "black";
            }
        });
        
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        taskList.appendChild(listItem);
    });
    
    element.appendChild(taskList);
};
