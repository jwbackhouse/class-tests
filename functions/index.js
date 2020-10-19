// Firebase Cloud Function
// Calculates score when new answers added to a test
// Triggered in background by collection updates

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const updateFirestore = (docId, studentId, answers) => {
  db.collection('tests').doc(docId).get()
    .then(doc => {
      const questions = doc.data().questions;
      let score = 0;

      // Calculate score
      for (let i = 0; i < answers.length; i++) {
        if (answers[i] === questions[i].correct) {
          score += 1;
        }
      }

      // Update student's entry
      doc.ref.update({
        [`studentsCompleted.${studentId}.score`]: score,
        })
        .then(() => console.log('Updated successfully'))
        .catch(error => console.log('Error updating score:', error));
    })
    .catch(error => console.log('Error retrieving questions:', error));
};

// Listen for changes in studentsCompleted nested object
exports.calcScore = functions.firestore
  .document('tests/{docId}')
  .onUpdate((change, context) => {
    const docId = context.params.docId;

    const oldData = change.before.data().studentsCompleted;
    const newData = change.after.data().studentsCompleted;
    const oldStudentKeys = Object.keys(oldData);
    const newStudentKeys = Object.keys(newData);

    for (let key of newStudentKeys) {
      // Check for new student submission OR new answers
      if (!oldStudentKeys.includes(key) ||
        oldData[key].answers != newData[key].answers
      ) {
        updateFirestore(docId, key, newData[key].answers);
      }
    }
  });
