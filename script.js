const url = "https://cz-ks-comp4537-lab5-935f0204a0a6.herokuapp.com";



const insertBtn = document.getElementById("insert-btn");

insertBtn.style.width = "200px";
insertBtn.style.height = "50px";
insertBtn.innerText = messages.insertLabel;

insertBtn.addEventListener("click", function () {
  const rows = [
    { name: "Sara Brown", dob: "1901-01-01" },
    { name: "John Smith", dob: "1964-01-01" },
    { name: "Jack Ma", dob: "1961-01-30" },
    { name: "Elon Musk", dob: "1999-01-01" },
  ];
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${url}/insert`, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("insert-response").innerText =
        messages.rowSuccess + xhr.responseText;
    } else {
      document.getElementById("insert-response").innerText =
        messages.rowError;
    }
  };

  if (!window.lastInsertedRowIndex) {
    window.lastInsertedRowIndex = 0;
  }
  const row = rows[window.lastInsertedRowIndex % rows.length];
  xhr.send(JSON.stringify(row));
  window.lastInsertedRowIndex++;
});

const queryBtn = document.getElementById("execute-query-btn");

queryBtn.style.width = "200px";
queryBtn.style.height = "50px";
queryBtn.innerText = messages.queryLabel;

queryBtn.addEventListener("click", function () {
  const query = document.getElementById("sql-query").value.trim();
  if (query.toLowerCase().startsWith("select")) {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `${url}/query?sql=${encodeURIComponent(query)}`,
      true
    );
    xhr.onload = function () {
      if (xhr.status === 200) {
        document.getElementById("query-response").innerText =
          xhr.responseText;
      } else {
        document.getElementById("query-response").innerText =
          queryError;
      }
    };
    xhr.send();
  } else if (query.toLowerCase().startsWith("insert")) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${url}/query`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status === 200) {
        document.getElementById("query-response").innerText =
          xhr.responseText;
      } else {
        document.getElementById("query-response").innerText =
          queryError;
      }
    };
    xhr.send(JSON.stringify({ sql: query }));
  } else {
    document.getElementById("query-response").innerText =
      queryRules;
  }
});
