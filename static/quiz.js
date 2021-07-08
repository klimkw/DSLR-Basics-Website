$(document).ready(function(){
    console.log('ready!');
});

const quiz_q = {
    "num_questions": 5,
    "questions":[
        {
            "q_num": 1,
            "has_img" : true,
            "q_img": "https://cdn.digital-photo-secrets.com/images/dog-abstract-blurry.jpg",
            "q_question": "Which setting should you adjust to freeze the action?",
            "num_choices": 3,
            "choices": [
                {
                    "answer": "Aperture",
                    "correct": false
                },
                {
                    "answer": "Shutter Speed",
                    "correct": true
                },
                {
                    "answer": "ISO",
                    "correct": false
                }
            ]
        },
        {
            "q_num": 2,
            "has_img" : true,
            "q_img": "https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2021/03/portrait-photography-tips-3.jpg?resize=1500%2C1000&ssl=1",
            "q_question": "Which setting should you adjust to blur the background?",
            "num_choices": 3,
            "choices": [
                {
                    "answer": "Aperture",
                    "correct": true
                },
                {
                    "answer": "Shutter Speed",
                    "correct": false
                },
                {
                    "answer": "ISO",
                    "correct": false
                }
            ]
        },
        {
            "q_num": 3,
            "has_img" : true,
            "q_img": "https://live.staticflickr.com/8455/29641106695_699b2e0985_b.jpg",
            "q_question": "Which setting should you adjust to soften the noise?",
            "num_choices": 3,
            "choices": [
                {
                    "answer": "Aperture",
                    "correct": false
                },
                {
                    "answer": "Shutter Speed",
                    "correct": false
                },
                {
                    "answer": "ISO",
                    "correct": true
                }
            ]
        },
        {
            "q_num": 4,
            "has_img" : true,
            "q_img": "https://www.colesclassroom.com/wp-content/uploads/2020/07/Overexposure-vs-Underexposure-4-1-1.jpg",
            "q_question": "What can you do to achieve better exposure for this picture?",
            "num_choices": 3,
            "choices": [
                {
                    "answer": "Increase Aperture",
                    "correct": false
                },
                {
                    "answer": "Decrease SS",
                    "correct": true
                },
                {
                    "answer": "Decrease ISO",
                    "correct": false
                }
            ]
        },
        {
            "q_num": 5,
            "has_img" : true,
            "q_img": "https://i.stack.imgur.com/duaoZ.jpg",
            "q_question": "What can you do to achieve better exposure for this picture?",
            "num_choices": 3,
            "choices": [
                {
                    "answer": "Increase Aperture",
                    "correct": true
                },
                {
                    "answer": "Decrease SS",
                    "correct": false
                },
                {
                    "answer": "Decrease ISO",
                    "correct": false
                }
            ]
        }
    ]
};

let num_questions = quiz_q["num_questions"];
let cur_q = 0;
let correct = 0;

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

const prev_btn = document.querySelector('.previous');

prev_btn.addEventListener("click", function(){
    location.href = "/experiment";
});

const quiz_frame = document.querySelector(".quiz_frame");
const start_btn = document.getElementById("start");

start_btn.addEventListener("click", quiz);

function quiz() {
    ask(cur_q);
};

function clear_frame() {
    while (quiz_frame.firstChild) {
        quiz_frame.removeChild(quiz_frame.firstChild);
    };
};

function ask(question_num) {
    clear_frame();
    q = quiz_q["questions"][question_num];

    var q_header = document.createElement("img");
    q_header.classList.add("img_frame");
    q_header.src = q["q_img"];
    var q_sub = document.createElement("h2");
    q_sub.innerText = q["q_question"];
    var choices = document.createElement("div");
    var ans_a = createButton(q["choices"][0]["answer"], q["choices"][0]["correct"]);
    var ans_b = createButton(q["choices"][1]["answer"], q["choices"][1]["correct"]);
    var ans_c = createButton(q["choices"][2]["answer"], q["choices"][2]["correct"]);

    choices.appendChild(ans_a);
    choices.appendChild(ans_b);
    choices.appendChild(ans_c);

    quiz_frame.appendChild(q_header);
    quiz_frame.appendChild(q_sub);
    quiz_frame.appendChild(choices);
};

function createButton(btn_text, correct_bool) {
    var newBtn = document.createElement("button");
    newBtn.classList.add(correct_bool, "choices", "btn", "btn-outline-light");
    newBtn.innerText = btn_text;
    newBtn.addEventListener("click", answered);
    return newBtn;
};

async function answered(e) {
    e.preventDefault();
    var alert = document.createElement("div");
    alert.setAttribute("role", "alert");
    if (e.target.classList.contains("true")) {
        correct = correct + 1;
        alert.classList.add("alert", "alert-success");
        alert.innerText = "Correct!";
    } else {
        alert.classList.add("alert", "alert-danger");
        alert.innerText = "Wrong.";
    };

    quiz_frame.appendChild(alert);

    await sleep(1500);
    
    if (cur_q === num_questions-1) {
        display_final();
    } else {
        cur_q = cur_q + 1;
        ask(cur_q);
    };
};

function display_final() {
    clear_frame();
    var final_title = document.createElement("h1");
    final_title.classList.add("quiz-welcome");
    var msg = document.createElement("p");
    msg.classList.add("lead");
    var btn = document.createElement("button");
    btn.classList.add("btn", "btn-outline-light");
    if (correct === num_questions) {
        final_title.innerText = "Congratulations!";
        msg.innerText = "You have mastered the basics of DSLR photography!";
        btn.innerText = "Back to home"
        btn.addEventListener("click", function(){
            location.href = "/";
        });
    } else {
        final_title.innerText = "Sorry!";
        msg.innerText = "You did not get 100%";
        btn.innerText = "Try again";
        btn.addEventListener("click", reload);
    }
    

    quiz_frame.appendChild(final_title);
    quiz_frame.appendChild(msg);
    quiz_frame.appendChild(btn);
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function reload(e){
    e.preventDefault();
    location.reload();
}