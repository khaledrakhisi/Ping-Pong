var n_ball_left = 100;
var n_ball_top = 0;
var b_toRight = true;
var b_toBottom = true;
var n_ball_step = 1;

var n_rightHandle_top = 0;
var n_leftHandle_top = 0;
var n_handle_step = 12;

var timer_1 = setInterval(timer_tick, 1);

var ball = document.getElementById("ball");
var handle_right = document.getElementById("handle_right");
var handle_left = document.getElementById("handle_left");

// first get the size from the window
// if that didn't work, get it from the body
var n_screen_size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

function timer_tick(){
  n_screen_size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }

  ball.style.left = n_ball_left + "px";
  ball.style.top = n_ball_top + "px";
    // console.log(n_screen_size.width + " <> " + ball.style.left)

  if(b_toRight){
    n_ball_left += n_ball_step;
  }else{
    n_ball_left -= n_ball_step;
  }

  if(b_toBottom){
    n_ball_top += n_ball_step;

  }else{
    n_ball_top -= n_ball_step;
  }

  if(n_ball_left >= n_screen_size.width){
    stopInterval(timer_1);

  }else if(n_ball_left <= 0){
    stopInterval(timer_1);
  }

  if(isCollapsed(ball, handle_right)){
    b_toRight = false;

  }else if(isCollapsed(ball, handle_left)){
    b_toRight = true;
  }

  if(n_ball_top >= n_screen_size.height){
    b_toBottom = false;

  }else if(n_ball_top < 0){
    b_toBottom = true;
  }
}


document.onkeydown = function (e) {

  e = e || window.event;
  switch (e.keyCode) {
     case 87: //w
        // console.log("Left key is pressed.");
        n_leftHandle_top -= n_handle_step;
        handle_left.style.top = n_leftHandle_top + "px";

        break;

     case 38: //up
        // console.log("Up key is pressed.");
        n_rightHandle_top -= n_handle_step;
        handle_right.style.top = n_rightHandle_top + "px";

        break;

     case 83: //s
        // console.log("Right key is pressed.");
        n_leftHandle_top += n_handle_step;
        handle_left.style.top = n_leftHandle_top + "px";

        break;

     case 40: //down
        // console.log("Down key is pressed.");
        n_rightHandle_top += n_handle_step;
        handle_right.style.top = n_rightHandle_top + "px";

        break;
  }
}

function isCollapsed(dragMe, rect){
  var object_1 = dragMe.getBoundingClientRect();
  var object_2 = rect.getBoundingClientRect();

  if (object_1.left < object_2.left + object_2.width  && object_1.left + object_1.width  > object_2.left &&
		object_1.top < object_2.top + object_2.height && object_1.top + object_1.height > object_2.top) {
    rect.classList.add("collide");
    return true;
  }
  else{
    rect.classList.remove("collide");
    return false;
  }
}
