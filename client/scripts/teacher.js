// API requests
const getAllTests = () => {
  return fetch('/teacher')
    .then(res => res.json())
    .catch(err => console.log('Error fetching data in getAllTests()', err));
};


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



// const testForm = document.getElementById('test-form');
// if (testForm) {
//   testForm.addEventListener('submit', e => {
//     e.preventDefault();

//     const q1Answers = [
//       testForm.querySelector('#q1-ans-1').value,
//       testForm.querySelector('#q1-ans-2').value,
//       testForm.querySelector('#q1-ans-3').value,
//       testForm.querySelector('#q1-ans-4').value,
//     ];
//     const q2Answers = [
//       testForm.querySelector('#q2-ans-1').value,
//       testForm.querySelector('#q2-ans-2').value,
//       testForm.querySelector('#q2-ans-3').value,
//       testForm.querySelector('#q2-ans-4').value,
//     ];

//     const formData = [{
//       title: testForm.querySelector('#q1-title').value,
//       answers: q1Answers,
//       correct: testForm.querySelector('#q1-correct').value,
//     }, {
//       title: testForm.querySelector('#q2-title').value,
//       answers: q2Answers,
//       correct: testForm.querySelector('#q2-correct').value,
//     }];

//     const testTitle = testForm.querySelector('#test-title').value;

//     addTest(formData, testTitle);
//   });
// }

// const addTest = (questions, title) => {
//   db.collection('tests').add({
//       title,
//       questions,
//       studentsCompleted: [], // Not necessary to add here
//       live: true,
//     })
//     .then(docRef => {
//       console.log(`Document written successfully with ID: ${docRef.id}`);
//       window.location.href = './teacher.html';
//     })
//     .catch(error => {
//       console.error('Error adding document: ', error);
//     });
// };
