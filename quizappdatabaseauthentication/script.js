// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBgZb57JBkUVi96vJDVQbmDTwXujvXPY3c",
  authDomain: "quizapp-8f637.firebaseapp.com",
  databaseURL: "https://quizapp-8f637-default-rtdb.firebaseio.com",
  projectId: "quizapp-8f637",
};

// Init
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// AUTH
function signup() {
  auth.createUserWithEmailAndPassword(
    signupEmail.value,
    signupPassword.value
  ).then(() => alert("Signup Successful"))
   .catch(err => alert(err.message));
}

function login() {
  auth.signInWithEmailAndPassword(
    loginEmail.value,
    loginPassword.value
  ).then(() => {
    document.getElementById("authBox").style.display = "none";
    document.getElementById("quizBox").style.display = "block";
    quiz();
  }).catch(() => alert("Wrong Email or Password"));
}

// QUIZ DATA
const ques = [
  { q: "HTML ka full form kya hai?", a: ["Hyper Text Markup Language","High Text Machine Language","Hyper Tool Markup Language","Home Text Markup Language"] },

  { q: "HTML ka use kis liye hota hai?", a: ["Styling","Structure","Logic","Database"] },

  { q: "CSS ka full form kya hai?", a: ["Cascading Style Sheets","Creative Style System","Computer Style Sheet","Colorful Style Sheet"] },

  { q: "CSS ka main use kya hai?", a: ["Structure banana","Design & Styling","Database","Server"] },

  { q: "JavaScript kis type ki language hai?", a: ["Markup","Styling","Programming","Query"] },

  { q: "HTML mein link banane ke liye kaunsa tag use hota hai?", a: ["<a>","<link>","<href>","<url>"] },

  { q: "HTML mein image add karne ka tag?", a: ["<img>","<image>","<src>","<pic>"] },

  { q: "CSS mein text ka color change karne ki property?", a: ["font-color","color","text-style","background"] },

  { q: "CSS file ko HTML se link karne ka tag?", a: ["<style>","<css>","<link>","<script>"] },

  { q: "JavaScript mein variable declare karne ke liye?", a: ["var","int","string","define"] },

  { q: "JavaScript mein function kaise banaya jata hai?", a: ["function myFunc() {}","def myFunc()","create myFunc()","func myFunc()"] },

  { q: "HTML mein ordered list ka tag?", a: ["<ul>","<ol>","<li>","<list>"] },

  { q: "CSS mein background color set karne ki property?", a: ["color","bgcolor","background-color","background"] },

  { q: "JavaScript DOM ka full form?", a: ["Document Object Model","Data Object Model","Document Oriented Method","Digital Object Method"] },

  { q: "Button click event JS mein kaunsa hota hai?", a: ["onclick","onpress","onhover","onsubmit"] },

  { q: "HTML mein sab se bari heading?", a: ["<h6>","<h4>","<h1>","<h2>"] },

  { q: "CSS mein class selector ka symbol?", a: ["#",".","*","%"] },

  { q: "CSS mein id selector ka symbol?", a: [".","#","@","$"] },

  { q: "JavaScript mein array kaise likhte hain?", a: ["[]","{}","()","<>"] },

  { q: "HTML, CSS, JS ka role web mein?", a: ["Sirf design","Sirf structure","Structure, design & interactivity","Sirf database"] }
];


const correct = [
  "Hyper Text Markup Language",
  "Structure",
  "Cascading Style Sheets",
  "Design & Styling",
  "Programming",
  "<a>",
  "<img>",
  "color",
  "<link>",
  "var",
  "function myFunc() {}",
  "<ol>",
  "background-color",
  "Document Object Model",
  "onclick",
  "<h1>",
  ".",
  "#",
  "[]",
  "Structure, design & interactivity"
];


let index = 0;
let score = 0;

const question = document.getElementById("ques");
const options = document.querySelectorAll(".box2");
const nextBtn = document.getElementById("nxt");

// LOAD QUESTION
function quiz() {
  question.innerText = ques[index].q;
  options.forEach((opt, i) => {
    opt.innerText = ques[index].a[i];
    opt.parentElement.style.background = "#ccc";
    opt.parentElement.onclick = () => check(opt.innerText, opt.parentElement);
  });
  nextBtn.style.display = "none";
}

// CHECK ANSWER
function check(ans, box) {
  options.forEach(o => o.parentElement.onclick = null);

  if (ans === correct[index]) {
    box.style.background = "green";
    score++;
  } else {
    box.style.background = "red";
  }
  nextBtn.style.display = "block";
}

// NEXT
nextBtn.onclick = () => {
  index++;
  if (index >= ques.length) {
    finishQuiz();
  } else {
    quiz();
  }
};

// SAVE SCORE
function finishQuiz() {
  document.getElementById("quizBox").style.display = "none";
  document.getElementById("resultBox").style.display = "block";
  document.getElementById("resultText").innerText =
    `Score: ${score}/${ques.length}`;

  const uid = auth.currentUser.uid;
  db.ref("scores/" + uid).set({
    score: score,
    total: ques.length
  });
}
