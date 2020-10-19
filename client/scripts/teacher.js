// API requests
const getAllTests = () => {
  return fetch('/teacher')
    .then(res => res.json())
    .catch(err => console.log('Error fetching data in getAllTests()', err));
};

const postNewTest = testData => {
  const body = JSON.stringify(testData);
  return fetch('/teacher/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    .then(res => res.json())
    .catch(err => console.log('Error posting new test in postNewTest():', err));
};

function toggleLive() {
  const testId = this.id;
  const body = JSON.stringify({ testId });

  fetch('/teacher/toggle-live', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    .then(res => console.log('Toggled successfully'))
    .catch(err => console.log('Error toggling live status:', err));
}


// Dashboard page
const testList = document.getElementById('test-list');
if (testList) {
  // Fetch all tests
  getAllTests()
    .then(data => {
      data.forEach(test => {
        const testTitle = document.createElement('p');
        testTitle.appendChild(document.createTextNode(test.data.title));

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'toggle-live');
        checkbox.setAttribute('id', test.testId);
        checkbox.checked = test.data.live;
        checkbox.addEventListener('change', toggleLive);
        testTitle.appendChild(checkbox);

        if (test.data.studentsCompleted) {
          // const studentListTitle = document.createElement('p')
          // studentListTitle.innerHTML = 'Students who have already completed the test:';

          const studentList = document.createElement('ul');
          const studentIdArr = Object.keys(test.data.studentsCompleted);
          for (let id of studentIdArr) {
            const studentId = document.createElement('li');
            studentId.appendChild(document.createTextNode(id));
            studentList.appendChild(studentId);
          }

          // testTitle.appendChild(studentListTitle);
          testTitle.appendChild(studentList);
        }
        testList.appendChild(testTitle);
      });
    })
    .catch(err => console.log('Error rendering tests in getAllTests(): ', err));
}

// Add test page
const testForm = document.getElementById('test-form');
if (testForm) {
  testForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = testForm.querySelector('#test-title').value;
    const allFieldsetEls = testForm.querySelectorAll('fieldset');
    let allQuestions = [];

    for (let i = 0; i < allFieldsetEls.length; i++) {
      const qNum = i + 1;
      const answers = [];

      const question = allFieldsetEls[i].querySelector(`#q${qNum}-question`).value;
      answers.push(allFieldsetEls[i].querySelector(`#q${qNum}-ans-1`).value);
      answers.push(allFieldsetEls[i].querySelector(`#q${qNum}-ans-2`).value);
      answers.push(allFieldsetEls[i].querySelector(`#q${qNum}-ans-3`).value);
      answers.push(allFieldsetEls[i].querySelector(`#q${qNum}-ans-4`).value);
      const correct = allFieldsetEls[i].querySelector(`#q${qNum}-correct`).value;

      allQuestions.push({
        question,
        answers,
        correct: +correct,
      });
    }

    const newTest = {
      title,
      questions: allQuestions,
      live: false,
    };

    postNewTest(newTest)
      .then(data => window.location.href = './teacher.html')
      .catch(err => console.log('Error posting new test', err));
  });
}
