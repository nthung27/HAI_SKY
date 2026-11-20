// TÙY CHỈNH NỘI DUNG TẠI ĐÂY


const CONFIG = {
  name: "Lê Đức Hải",

  wish: `Chúc mừng sinh nhật lần thứ 25 của Lê Đức Hải!

Chúc Hải tuổi mới luôn mạnh khỏe, đẹp trai, phong độ và tràn đầy năng lượng.

Chúc sự nghiệp ngày càng thăng tiến, tiền bạc rủng rỉnh, tài khoản ngân hàng không bao giờ báo số dư thấp.

Chúc sớm đạt được những mục tiêu lớn, gặp nhiều may mắn, công việc thuận lợi và tình duyên nở hoa.

Mong rằng tuổi 25 sẽ là một chương thật tuyệt vời trong cuộc đời Hải.

Hãy luôn vui vẻ, tự tin, sống hết mình và nhớ rằng: 25 tuổi rồi, bớt báo lại một chút nhé!

HAPPY 25TH BIRTHDAY, LÊ ĐỨC HẢI! 🎂🎉❤️`,

  roast: [
    "📌 Ngày bé từng mơ lớn lên làm đại gia, 25 tuổi vẫn đang chờ tài khoản báo số dư.",
    "📌 Miệng nói trưởng thành nhưng gặp đồ ăn ngon là vui như trúng số.",
    "📌 Từng tuyên bố không yêu đương linh tinh, nhưng thấy gái xinh là quên hết lời thề.",
    "📌 25 tuổi: tuổi trẻ có thừa, tiền bạc thì đang trong quá trình tích lũy. 🤣",
    "📌 Độ đẹp trai tự đánh giá 10/10, còn người khác đánh giá thì chưa rõ! 😎"
  ]
};


const $=s=>document.querySelector(s);
let soundOn=true,musicOn=true,audioCtx=null,quizStep=0,blown=false,musicTimer=null,musicIndex=0;
const screens=[...document.querySelectorAll(".screen")];
function showScreen(id){screens.forEach(s=>s.classList.toggle("active",s.id===id));window.scrollTo({top:0,behavior:"smooth"})}
function beep(freq=550,duration=.09){if(!soundOn)return;try{audioCtx ||= new(window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.frequency.value=freq;o.type="sine";g.gain.setValueAtTime(.07,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioCtx.currentTime+duration);o.connect(g);g.connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+duration)}catch(e){}}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2100)}
function confetti(n=140){const c=$("#confetti"),x=c.getContext("2d");c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.scale(devicePixelRatio,devicePixelRatio);const a=Array.from({length:n},()=>({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight,r:3+Math.random()*5,v:2+Math.random()*5,k:Math.random()*6,h:Math.random()*360}));let f=0;function draw(){x.clearRect(0,0,innerWidth,innerHeight);a.forEach(p=>{p.y+=p.v;p.x+=Math.sin(p.k)*1.5;p.k+=.04;x.fillStyle=`hsl(${p.h},95%,68%)`;x.fillRect(p.x,p.y,p.r,p.r*1.8)});if(++f<170)requestAnimationFrame(draw);else x.clearRect(0,0,innerWidth,innerHeight)}draw()}

// Chọn ảnh ngay trên máy: ảnh chỉ hiển thị trong trình duyệt của người đang mở trang.
$("#photoInput").addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;if(!f.type.startsWith("image/")){toast("Vui lòng chọn tệp ảnh nhé!");return}const url=URL.createObjectURL(f);$("#personPhoto").src=url;$("#photoFrame").classList.add("has-photo");$("#roastPhoto").innerHTML=`<img src="${url}" alt="Ảnh lúc bóc phốt">`;toast("Đã nhận diện nhân vật chính!")});
$("#displayName").textContent=CONFIG.name;$("#finalWish").textContent=CONFIG.wish;$("#year").textContent=new Date().getFullYear();
$("#roastPhoto").textContent="👶";$(".roast-card ul").innerHTML=CONFIG.roast.map(t=>`<li>${t}</li>`).join("");

// Happy Birthday melody played with Web Audio (no external MP3 needed).
const melody=[392,392,440,392,523,494,392,392,440,392,587,523,392,392,784,659,523,494,440,698,698,659,523,587,523];
const durations=[.28,.28,.55,.55,.55,1, .28,.28,.55,.55,.55,1, .28,.28,.55,.55,.55,.55,1, .28,.28,.55,.55,.55,1];
function playBirthday(){if(!musicOn)return;try{audioCtx ||= new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==="suspended")audioCtx.resume();let t=audioCtx.currentTime+.05;melody.forEach((freq,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain(),d=durations[i]||.4;o.type="triangle";o.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.12,t+.025);g.gain.setTargetAtTime(.0001,t+d*.82,.04);o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+d);t+=d+.035});musicTimer=setTimeout(playBirthday,(t-audioCtx.currentTime)*1000+100)}catch(e){toast("Trình duyệt chưa hỗ trợ phát nhạc.")}}
function stopMusic(){if(musicTimer)clearTimeout(musicTimer);musicTimer=null}
function startMusic(){stopMusic();if(musicOn)playBirthday()}
$("#musicToggle").addEventListener("click",()=>{musicOn=!musicOn;$("#musicToggle").textContent=musicOn?"🎵 Nhạc: bật":"🔇 Nhạc: tắt";if(musicOn){startMusic();beep()}else stopMusic()});
$("#soundToggle").addEventListener("click",()=>{soundOn=!soundOn;$("#soundToggle").textContent=soundOn?"🔊 Âm thanh: bật":"🔇 Âm thanh: tắt";if(soundOn)beep()});

// Speech synthesis uses an installed Vietnamese voice if available.
function speakWish(){if(!("speechSynthesis"in window)){toast("Trình duyệt không hỗ trợ đọc lời chúc.");return}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(`Chúc mừng sinh nhật ${CONFIG.name}! ${CONFIG.wish}`);u.lang="vi-VN";u.rate=.92;u.pitch=1.08;const voices=speechSynthesis.getVoices();const vi=voices.find(v=>v.lang.toLowerCase().startsWith("vi"));if(vi)u.voice=vi;speechSynthesis.speak(u)}
$("#speakBtn").addEventListener("click",speakWish);

$("#startBtn").addEventListener("click",()=>{beep(650);startMusic();showScreen("troll")});
const noBtn=$("#noBtn");let noCount=0;
function dodge(){const stage=$(".no-stage"),r=stage.getBoundingClientRect(),b=noBtn.getBoundingClientRect();const maxX=Math.max(0,r.width-b.width),maxY=Math.max(0,r.height-b.height);noBtn.style.position="absolute";noBtn.style.left=Math.random()*maxX+"px";noBtn.style.top=Math.random()*maxY+"px";noCount++;$("#noHint").textContent=["Bắt hụt rồi nha! 🤪","Nút NO có chân đó! 🏃","Thôi đừng cố, bấm CÓ đi! 😂"][Math.min(noCount-1,2)];beep(260)}
noBtn.addEventListener("mouseenter",dodge);noBtn.addEventListener("touchstart",e=>{e.preventDefault();dodge()},{passive:false});noBtn.addEventListener("click",dodge);
$("#yesBtn").addEventListener("click",()=>{beep(700);showScreen("quiz");renderQuestion()});

const qs=[
{emoji:"🤔",title:"Bạn có công nhận hôm nay mình đẹp nhất không?",sub:"Trả lời thật lòng nhé, camera đang ghi hình đó!",yes:"Đúng rồi, đẹp xuất sắc! 😎",no:"Khiêm tốn quá mức cho phép! 🤣"},
{emoji:"💰",title:"Nếu có người chuyển khoản 10 triệu, bạn có nhận không?",sub:"Câu hỏi mang tính nghiên cứu khoa học.",yes:"Tham vọng rất thực tế! 😂",no:"Từ chối tiền? Bạn là ai vậy? 👽"},
{emoji:"🧠",title:"Tuổi mới hứa sẽ bớt báo chứ?",sub:"Hãy suy nghĩ kỹ trước khi cam kết.",yes:"Chúng tôi sẽ kiểm tra định kỳ! 👀",no:"Thành thật thế mới đáng quý! 🫡"}
];
function renderQuestion(){const q=qs[quizStep];$("#quizEmoji").textContent=q.emoji;$("#question").textContent=q.title;$("#questionSub").textContent=q.sub;$("#progressBar").style.width=((quizStep+1)/3*100)+"%";$("#quizStep").textContent=`NHIỆM VỤ 0${quizStep+1} / 03`;}
$("#answers").addEventListener("click",e=>{const b=e.target.closest("[data-answer]");if(!b)return;const q=qs[quizStep];$("#quizFeedback").textContent=b.dataset.answer==="yes"?q.yes:q.no;beep(b.dataset.answer==="yes"?700:330);setTimeout(()=>{quizStep++;if(quizStep<qs.length)renderQuestion();else{showScreen("roast");confetti(80)}},850)});
$("#toGiftBtn").addEventListener("click",()=>{showScreen("gift");beep(600)});
$("#giftBox").addEventListener("click",()=>{beep(880);$("#giftHint").textContent="BÙM! QUÀ ĐÃ MỞ 🎉";confetti(170);setTimeout(()=>showScreen("cake"),800)});
function blow(){if(blown)return;blown=true;document.querySelectorAll(".candle").forEach(c=>{c.textContent="💨";c.classList.add("out")});$("#blowHint").textContent="Ước nguyện đã được gửi lên vũ trụ! 🌠";$("#blowBtn").textContent="NHẬN LỜI CHÚC CUỐI CÙNG 💖";confetti(210);beep(240,.25);$("#blowBtn").onclick=()=>{showScreen("final");confetti(220);startMusic()}}
$("#blowBtn").addEventListener("click",blow);document.querySelectorAll(".candle").forEach(c=>c.addEventListener("click",blow));
$("#replayBtn").addEventListener("click",()=>{blown=false;quizStep=0;noCount=0;noBtn.removeAttribute("style");document.querySelectorAll(".candle").forEach(c=>{c.textContent="🕯️";c.classList.remove("out")});$("#blowHint").textContent="Bấm nút hoặc nhấn phím cách để thổi nến.";$("#blowBtn").textContent="THỔI NẾN NGAY 💨";$("#blowBtn").onclick=null;$("#giftHint").textContent="CHẠM ĐỂ MỞ QUÀ";showScreen("welcome");startMusic()});
document.addEventListener("keydown",e=>{if(e.code==="Space"&&$("#cake").classList.contains("active")){e.preventDefault();blow()}});
window.addEventListener("beforeunload",()=>{stopMusic();if("speechSynthesis"in window)speechSynthesis.cancel()});
