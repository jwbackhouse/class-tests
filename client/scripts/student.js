// Assume studentId would come from auth (not implemeted in this mock-up)
const studentId = 123;

// API requests
const getLiveTests = () => {
  return fetch(`/student/${studentId}`)
    .then(res => res.json())
    .catch(err => console.log('Error fetching data in getLiveTests()', err));
};

const getSingleTest = testId => {
  return fetch(`/test/${testId}`)
    .then(res => res.json())
    .catch(err => console.log('Error fetching data in getSingleTest()', err));
};

const postAnswers = (testId, answerArr) => {
  const body = JSON.stringify({ answers: answerArr });
  return fetch(`/student/${studentId}/${testId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    .then(() => {})
    .catch(err => console.log('Error posting answers in postAnswers():', err));
};


// Dashboard page
const renderTests = () => {
  getLiveTests()
    .then(data => {
      data.forEach(test => {
        const li = document.createElement('li');
        const ahref = document.createElement('a');
        ahref.setAttribute('href', `./test.html?testId=${test.testData.id}`);
        ahref.innerHTML = test.testData.title;

        li.appendChild(ahref);
        li.appendChild(document.createTextNode(` - completed: ${test.completed}`));

        testList.appendChild(li);
      });
    })
    .catch(err => console.log('Error rendering testList data:', err));
};

const testList = document.getElementById('test-list');
if (testList) {
  renderTests();

  // Refresh button
  const refreshBtn = document.getElementById('refresh');
  refreshBtn.addEventListener('click', () => {
    testList.innerHTML = '';
    renderTests();
  });
}


// Test page
const testForm = document.getElementById('test');
if (testForm) {
  let params = (new URL(document.location)).searchParams;
  const testId = params.get('testId');

  let testData;

  // GET test data
  getSingleTest(testId)
    .then(test => {
      testData = test;

      // Dynamically create form to allow for varying question numbers
      for (let i = 1; i <= test.questions.length; i++) {
        const questionData = test.questions[i - 1];

        // Skip if no question provided
        if (!questionData.question) continue;

        const question = document.createElement('p');
        question.innerHTML = `Question ${i}: ${questionData.question}`;

        const answerDiv = document.createElement('div');
        answerDiv.setAttribute('class', 'answers');

        for (let j = 0; j < 4; j++) {
          // Skip empty answers
          if (!questionData.answers[j]) continue;

          const answer = document.createElement('input');
          answer.setAttribute('type', 'radio');
          answer.setAttribute('name', `question${i}`);
          answer.setAttribute('id', `q${i}-ans${j}`);
          answer.setAttribute('value', questionData.answers[j]);

          const label = document.createElement('label');
          label.setAttribute('for', `q${i}-ans${j}`);
          label.innerHTML = questionData.answers[j];

          answerDiv.appendChild(label);
          answerDiv.appendChild(answer);
          answerDiv.appendChild(document.createElement('br'));
        }


        testForm.appendChild(question);
        testForm.appendChild(answerDiv);
        testForm.appendChild(document.createElement('br'));
      }

      const submitBtn = document.createElement('input');
      submitBtn.setAttribute('type', 'submit');
      submitBtn.setAttribute('value', 'Submit');

      testForm.appendChild(submitBtn);
    })
    .catch(err => console.log('Error rendering testForm data:', err));


  // POST answers
  testForm.addEventListener('submit', e => {
    e.preventDefault();

    let answerArr = [];

    for (let i = 1; i <= testData.questions.length; i++) {
      const radioBtns = testForm.querySelectorAll(`input[name="question${i}"]`);

      for (let j = 0; j < radioBtns.length; j++) {
        if (radioBtns[j].checked) {
          answerArr.push(j);
          break;
        }
      }
    }

    postAnswers(testId, answerArr)
      .then(() => window.location.href = './student.html')
      .catch(err => console.log('Error posting answers:', err));
  });
}
