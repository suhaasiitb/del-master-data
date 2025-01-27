document.addEventListener("DOMContentLoaded", function () {
    const fetchButton = document.getElementById("fetchButton");
    const resultContainer = document.getElementById("resultContainer");
    const resultTableBody = document.getElementById("resultTableBody");
  
    // Hide results initially
    resultContainer.style.display = "none";
  
    fetchButton.addEventListener("click", function () {
      // Get selected values
      const year = document.getElementById("year").value;
      const month = document.getElementById("month").value;
      const week = document.getElementById("week").value;
      const employeeId = document.getElementById("employeeId").value;
  
      // Validate inputs
      if (!year || !month || !week || !employeeId) {
        alert("Please fill in all fields before fetching data.");
        return;
      }
  
      // Build file path
      const filePath = `data/${year}/${month}/W-${week}.json`;
  
      // Fetch the data
      fetch(filePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`File not found: ${filePath}`);
          }
          return response.json();
        })
        .then((data) => {
          // Find data for the specified Employee ID
          const employeeData = data.find((item) => item.cee_id === employeeId);
  
          // Clear the table
          resultTableBody.innerHTML = "";
  
          if (!employeeData) {
            alert("No data found for the specified Employee ID.");
            resultContainer.style.display = "none";
            return;
          }
  
          // Populate the table with non-zero and non-empty values
          for (const [key, value] of Object.entries(employeeData)) {
            if (value && value !== "0" && value !== "") {
              const row = document.createElement("tr");
              const columnNameCell = document.createElement("td");
              const valueCell = document.createElement("td");
  
              columnNameCell.textContent = key;
              valueCell.textContent = value;
  
              row.appendChild(columnNameCell);
              row.appendChild(valueCell);
              resultTableBody.appendChild(row);
            }
          }
  
          // Show the results
          resultContainer.style.display = "block";
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
          resultContainer.style.display = "none";
        });
    });
  });
  