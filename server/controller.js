const db = require('./db.js');
const { validationResult } = require('express-validator');

// Students
exports.studentTests_get = async(req, res) => {
  // Handle errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  const studentId = req.params.studentId;

  let testArr = [];

  // Get live tests only
  db.collection('tests')
    .where('live', '==', true)
    .get()
    .then(querySnapshot => {
      const resultArr = querySnapshot.docs;

      for (let i = 0; i < resultArr.length; i++) {
        // Pass completed flag alongside full data object
        const studentsCompleted = resultArr[i].data().studentsCompleted;

        let completed = false;
        if (studentsCompleted) {
          const allStudentIds = Object.keys(studentsCompleted);
          completed = allStudentIds.includes(studentId);
        }

        testArr.push({
          testData: {
            id: resultArr[i].id,
            ...resultArr[i].data(),
          },
          completed,
        });
      }

      res.send(testArr);
    })
    .catch(error => {
      console.log('Error fetching test list in studentTests_get(): ', error);
      res.status(404).send();
    });
};

exports.test_get = (req, res) => {
  // Handle errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  const testId = req.params.testId;

  db.collection('tests').doc(testId).get()
    .then(doc => {
      const docObj = doc.data();

      // Limit fields to return
      const responseObj = {
        title: docObj.title,
        questions: docObj.questions,
      };

      res.send(responseObj);
    })
    .catch(err => {
      console.log('Error fetching test in test_get():', err);
      res.status(404).send();
    });
};

exports.test_post = (req, res) => {
  // Handle errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  const answers = req.body.answers;
  const testId = req.params.testId;
  const studentId = req.params.studentId;

  db.collection('tests').doc(testId).set({
      studentsCompleted: {
      [studentId]: {
          answers,
        },
      },
    }, { merge: true })
    .then(() => res.send())
    .catch(err => {
      console.log('Error posting answers in test_post()', err);
      res.status(500).send();
    });
};


// Teachers
exports.allTests_get = (req, res) => {
  let testArr = [];

  db.collection('tests')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(test => {
        testArr.push({
          testId: test.id,
          data: test.data()
        });
      });

      res.send(testArr);
    })
    .catch(error => {
      console.log('Error fetching tests in allTests_get(): ', error);
      res.status(404).send();
    });
};

exports.toggleLive_post = (req, res) => {
  // Handle errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  const testId = req.body.testId;

  db.collection('tests').doc(testId).get()
    .then(doc => {
      const currentState = doc.data().live;

      doc.ref.update({
          live: !currentState,
        })
        .then(() => res.send())
        .catch(err => {
          console.log('Error toggling live status in toggleLive_post():', err);
          res.status(500).send();
        });
    })
    .catch(err => {
      console.log('Error getting test data in toggleLive_post():', err);
      res.status(500).send();
    });
};

exports.addTest_post = (req, res) => {
  // Handle errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() });
  }

  const testBody = req.body;

  const newTest = {
    title: testBody.title,
    questions: testBody.questions,
    live: testBody.live,
  };

  db.collection('tests').add(newTest)
    .then(docRef => {
      console.log(`Document written successfully with ID: ${docRef.id}`);
      res.json(docRef.id);
    })
    .catch(err => {
      console.error('Error adding test in addTest_post(): ', err);
      res.status(500).send();
    });
};
