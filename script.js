let subjects = [
    "English Language",
    "Mathematics",
    "Basic Science",
    "Social Studies",
    "Computer Studies",
    "Civic Education",
    "Agricultural Science",
    "Business Studies"
];

let defaultSubjects = [
    "English Language",
    "Mathematics",
    "Basic Science",
    "Social Studies",
    "Computer Studies",
    "Civic Education",
    "Agricultural Science",
    "Business Studies"
];

let scoreRows = document.getElementById("scoreRows");
let resultRows = document.getElementById("resultRows");

// CREATE THE EIGHT ROWS IMMEDIATELY
function createRows() {
    scoreRows.innerHTML = "";
    resultRows.innerHTML = "";

    for (let i = 0; i < 8; i++) {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <select class="subject-input">
                    ${subjects.map(subject => `
                        <option value="${subject}"
                            ${subject === defaultSubjects[i] ? "selected" : ""}>
                            ${subject}
                        </option>
                    `).join("")}
                </select>
            </td>

            <td>
                <input type="number" class="score-input test1-input"
                    min="0" max="20" placeholder="0–20">
            </td>

            <td>
                <input type="number" class="score-input test2-input"
                    min="0" max="20" placeholder="0–20">
            </td>

            <td>
                <input type="number" class="score-input exam-input"
                    min="0" max="60" placeholder="0–60">
            </td>

            <td>
                <output class="total-output">—</output>
            </td>
        `;

        scoreRows.appendChild(row);

        let resultRow = document.createElement("tr");

        resultRow.innerHTML = `
            <td class="result-subject">—</td>
            <td class="result-total">—</td>
            <td class="result-grade">—</td>
            <td class="result-remark">—</td>
        `;

        resultRows.appendChild(resultRow);
    }

    updateResults();
}

// GET THE SCORE AND KEEP IT WITHIN THE ALLOWED RANGE
function getScore(input, maximum) {
    if (input.value.trim() === "") {
        return 0;
    }

    let score = Number(input.value);

    if (!Number.isFinite(score)) {
        score = 0;
    }

    score = Math.max(0, Math.min(maximum, score));

    input.value = score;

    return score;
}

// CHECK THE GRADE
function getGrade(total) {
    if (total >= 70) {
        return { grade: "A", remark: "Excellent" };
    } else if (total >= 60) {
        return { grade: "B", remark: "Very good" };
    } else if (total >= 50) {
        return { grade: "C", remark: "Good" };
    } else if (total >= 40) {
        return { grade: "D", remark: "Fair" };
    } else {
        return { grade: "F", remark: "Fail" };
    }
}

// UPDATE THE RESULT AUTOMATICALLY
function updateResults() {
    let inputRows = scoreRows.querySelectorAll("tr");
    let outputRows = resultRows.querySelectorAll("tr");

    let subjectsEntered = 0;
    let totalScores = 0;
    let subjectsWithScores = 0;

    inputRows.forEach((row, index) => {
        let subject = row.querySelector(".subject-input").value;

        let test1Input = row.querySelector(".test1-input");
        const test2Input = row.querySelector(".test2-input");
        const examInput = row.querySelector(".exam-input");

        const hasScore =
            test1Input.value.trim() !== "" ||
            test2Input.value.trim() !== "" ||
            examInput.value.trim() !== "";

        const test1 = getScore(test1Input, 20);
        const test2 = getScore(test2Input, 20);
        const exam = getScore(examInput, 60);

        const total = test1 + test2 + exam;

        // SHOW THE SUBJECT ON THE RIGHT IMMEDIATELY
        const resultRow = outputRows[index];

        resultRow.querySelector(".result-subject").textContent =
            subject || "—";

        // COUNT SELECTED SUBJECTS
        if (subject !== "") {
            subjectsEntered++;
        }

        // CALCULATE ONLY WHEN AT LEAST ONE SCORE IS ENTERED
        if (hasScore) {
            row.querySelector(".total-output").textContent = total;

            resultRow.querySelector(".result-total").textContent = total;

            const result = getGrade(total);
            const gradeCell = resultRow.querySelector(".result-grade");

            gradeCell.textContent = result.grade;
            gradeCell.className =
                "result-grade grade-" + result.grade.toLowerCase();

            resultRow.querySelector(".result-remark").textContent =
                result.remark;

            totalScores += total;
            subjectsWithScores++;
        } else {
            row.querySelector(".total-output").textContent = "—";

            resultRow.querySelector(".result-total").textContent = "—";

            const gradeCell = resultRow.querySelector(".result-grade");
            gradeCell.textContent = "—";
            gradeCell.className = "result-grade";

            resultRow.querySelector(".result-remark").textContent = "—";
        }
    });

    // COPY THE NAME AS YOU TYPE
    document.getElementById("resultName").textContent =
        document.getElementById("fullName").value;

    // COPY THE CLASS AUTOMATICALLY
    document.getElementById("resultClass").textContent =
        document.getElementById("studentClass").value;

    // SHOW NUMBER OF SELECTED SUBJECTS
    document.getElementById("subjectsCount").textContent =
        subjectsEntered;

    // CALCULATE THE AVERAGE OF SUBJECTS WITH SCORES
    document.getElementById("averageScore").textContent =
        subjectsWithScores > 0
            ? (totalScores / subjectsWithScores).toFixed(1)
            : "—";

    // COPY THE REMARKS AUTOMATICALLY
    document.getElementById("resultPrincipalRemark").textContent =
        document.getElementById("principalRemark").value || "—";

    document.getElementById("resultTeacherRemark").textContent =
        document.getElementById("teacherRemark").value || "—";
}

// UPDATE WHEN YOU TYPE OR CHANGE A SUBJECT
scoreRows.addEventListener("input", updateResults);
scoreRows.addEventListener("change", updateResults);

// UPDATE NAME, CLASS AND REMARKS AS YOU TYPE
document.getElementById("fullName").addEventListener(
    "input",
    updateResults
);

document.getElementById("studentClass").addEventListener(
    "change",
    updateResults
);

document.getElementById("principalRemark").addEventListener(
    "input",
    updateResults
);

document.getElementById("teacherRemark").addEventListener(
    "input",
    updateResults
);

// CLEAR EVERYTHING AND RESTORE THE DEFAULT SUBJECTS
document.getElementById("resetBtn").addEventListener("click", function() {
    document.getElementById("fullName").value = "";
    document.getElementById("studentClass").value = "JSS2";
    document.getElementById("principalRemark").value = "";
    document.getElementById("teacherRemark").value = "";

    createRows();
});

// DISPLAY GREETING BASED ON THE CURRENT TIME
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 16) {
        greeting = "Good afternoon";
    } else if (hour < 19) {
        greeting = "Good evening";
    } else {
        greeting = "Good night";
    }

    document.getElementById("greeting").textContent =
        greeting + "!";
}
  //DISPLAY TIME BASED ON CURRENT TIME
    let pelu = setInterval(Mytimer, 1000);
    function Mytimer(){
      let date = new Date();
      document.getElementById("shad").innerHTML=date.toLocaleTimeString(); 
    }
      
createRows();
updateGreeting();