const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.calcScore = functions.firestore
  .document('tests/{docId}')
  .onUpdate((change, context) => {
    const docId = context.params.docId;

    const oldData = change.before.data().studentsCompleted;
    const newData = change.after.data().studentsCompleted;
    const oldStudentKeys = Object.keys(oldData);
    const newStudentKeys = Object.keys(newData);

    for (let key of newStudentKeys) {
      // Check if new student answers exist
      if (!oldStudentKeys.includes(key)) {
        const answers = newData[key].answers;

        // Get the updated document
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
              [`studentsCompleted.${key}.score`]: score,
              })
              .then(() => console.log('Updated successfully'))
              .catch(error => console.log('Error updating score:', error));
          })
          .catch(error => console.log('Error retrieving questions:', error));
      }
    }
  });
