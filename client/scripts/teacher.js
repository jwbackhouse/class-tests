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


// Dashboard page
const testList = document.getElementById('test-list');
if (testList) {
  getAllTests()
    .then(data => {
      data.forEach(test => {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(test.title));
        testList.appendChild(li);
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
      .then(data => console.log('Test added successfully with ID:', data))
      .catch(err => console.log('Error posting new test', err));
  });
}
