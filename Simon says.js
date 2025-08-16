let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "orange", "blue"];
let started = false;
let level = 0;
let score = 0;
let p = document.querySelector("p");
let winLoss = document.querySelector("body");
//start by keypress
document.addEventListener("keypress", function () {
    //agar pehle start nhi tha to aab start karo
    if (started == false) {
        started = true;
        //game start hote hi level++
        levelUp();
    }
});
//button animation
function flash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 100);
}
//gameSeq.length why?--> userSeq agar chhoti hai,toh userSeq[i] undefined ho jayega.
//gameSeq[i] mein value hogi.Compare: undefined !== "red"→ gameOver()→ kyunki user ne abhi input poora diya hi nahi!
function correct() {
    for (let i = 0; i < userSeq.length; i++) {
        //input event type check karega ki entered val sahi h ya nhi
        if (userSeq[i] !== gameSeq[i]) {
            console.log("userSeq", userSeq);
            console.log("game over");
            winLoss.style.backgroundColor = "red";
            setTimeout(() => {
                winLoss.style.backgroundColor = "white";
            }, 200);
            gameOver();
            return;
        }
    } //jitna color system dia h user utna enter kar chuka ya nhi
    if (userSeq.length === gameSeq.length) {
        console.log("userSeq", userSeq);
        console.log("Level++");
        userSeq = [];
        score++;
        winLoss.style.backgroundColor = "green";
        setTimeout(() => {
            winLoss.style.backgroundColor = "white";
        }, 200);
        levelUp();
    }
}
function levelUp() {
    level++;
    p.innerText = `Level ${level}`;
    userSeq = [];
    //Randomly generated sequence
    let randBtnIdx = Math.floor(Math.random() * btns.length);
    let randBtn = btns[randBtnIdx];
    let randColorBtn = document.querySelector(`.${randBtn}`);
    gameSeq.push(`.${randBtn}`);
    console.log("gameSeq", gameSeq);
    //delayed flashed for btn generation
    setTimeout(() => {
        flash(randColorBtn);
    }, 500);
}
//checks similar as input event (i.e each click will be checked)
function btnPress() {
    //flashed for btn press
    flash(this);
    userSeq.push(`.${this.classList[1]}`);
    //Pressed button game ke sequential order me h ya nhi !?
    correct();
}
let allBtns = document.querySelectorAll(".btn");
//sara btn loop me jayega ek ek karke
for (let btn of allBtns) {
    //jo btn click hua wahi pass hoga
    btn.addEventListener("click", btnPress);
}
//Game khatam hote hi RESET EVERYTHING!
function gameOver() {
    level = 0;
    started = false;
    gameSeq = [];
    userSeq = [];
    p.innerHTML = `<b>GAME OVER!</b><br>Your score is ${score}<br>Double click to start again`;
    document.addEventListener("dblclick", function () {
        if (started == false) {
            started = true;
            levelUp();
        }
    });
}
