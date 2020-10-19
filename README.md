# Class Tests

A simple app to allow teachers to create tests, each containing <=10 multiple choice questions.
<br />
<br />
Once the teacher sets the tests live, they are visible to students. Once at student submits the test, their score is calculated and the teacher can see that they've completed it.

## App design
The app is built using a Node/Express REST API, with a **very** simple (completely unstyled) front end mocked up just to show the endpoints in action.
<br />
<br />
Data is stored in Firebase's [Cloud Firestore](https://firebase.google.com/docs/firestore). A [Cloud Function](https://firebase.google.com/docs/functions) triggers in the background whenever a student submits a test, which calculates their score and updates Firestore.

#### Alternative approach
Although written as a Node/Express REST API, this could equally work as an entirely serverless app using the GCP* API Gateway to handle HTTP requests with Cloud Functions* in place of controller functions.
<br />
(* or sub in AWS / Azure equivalents)

## To note
1. Given the brief, the database currently expects exactly 10 questions per test, each with 4 answers. However, the front end only renders questions/answers that contain content so it handles empty fields gracefully. This could obviously be easily changed if necessary.
2. As a mock-up, user authentication has not been implemented. To use the app as different users, simply change the `studentId` variable in client/scripts/server.js (in prodution this would be accessed via the auth token, and allow teachers to see student names not just IDs).
3. Please don't judge the front end styling!
4. No automated testing implemeted at this stage.


## Scripts
```sh
$ npm run dev
```
Launch Express server.
