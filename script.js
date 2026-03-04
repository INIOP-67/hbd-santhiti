const container=document.getElementById("heart")
const canvas=document.getElementById("bg-canvas")
const ctx=canvas.getContext("2d")

const intro=document.getElementById("intro")
const startBtn=document.getElementById("startBtn")
const centerName=document.getElementById("centerName")

/* ---------------- TEXT ---------------- */

const textSource=
" Happy Birthday ครับแฟน 🎂 ขอให้ปีนี้มีความสุขมากๆ รวยๆ เฮงๆ นะครับ ❤️ "

const rows=[]
const rowsCount=12

function initText(){

container.innerHTML=""
rows.length=0

const rowHeight=window.innerHeight/rowsCount

for(let r=0;r<rowsCount;r++){

const row=document.createElement("div")
row.className="row"

row.style.top=(r*(100/rowsCount))+4+"%"

row.innerText=textSource.repeat(6)

container.appendChild(row)

rows.push({

el:row,
x:Math.random()*-800,
speed:(r%2===0?0.15:-0.15),
centerY:(r*rowHeight)+(rowHeight/2),
width:0

})

}

requestAnimationFrame(()=>{

for(let i=0;i<rows.length;i++){
rows[i].width=rows[i].el.scrollWidth/3
}

})

}

/* ---------------- MOUSE ---------------- */

let mouseY=0

window.addEventListener("mousemove",e=>{
mouseY=e.clientY
})

/* ---------------- TEXT ANIMATION ---------------- */

function updateText(){

for(let i=0;i<rows.length;i++){

const row=rows[i]

row.x+=row.speed

if(row.speed>0 && row.x>0) row.x=-row.width
if(row.speed<0 && row.x<-row.width) row.x=0

let scale=1

const distY=Math.abs(mouseY-row.centerY)

if(distY<120){
scale=1+(1-distY/120)*0.35
}

row.el.style.transform=
`translate3d(${row.x}px,0,0) scale(${scale})`

}

}

/* ---------------- PARTICLES ---------------- */

let particles=[]

function resizeCanvas(){

canvas.width=window.innerWidth
canvas.height=window.innerHeight

}

function createParticles(){

particles=[]

for(let i=0;i<20;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2+1,
v:Math.random()*0.2+0.05

})

}

}

/* heart explosion */

function explodeHearts(x,y){

for(let i=0;i<80;i++){

particles.push({

x:x,
y:y,
r:Math.random()*3+1,
vx:(Math.random()-0.5)*4,
vy:(Math.random()-0.5)*4,
life:60

})

}

}

function drawParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.fillStyle="rgba(255,117,143,0.7)"

for(let i=particles.length-1;i>=0;i--){

const p=particles[i]

ctx.beginPath()
ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
ctx.fill()

if(p.vx!==undefined){

p.x+=p.vx
p.y+=p.vy

p.life--

if(p.life<=0){
particles.splice(i,1)
continue
}

}else{

p.y-=p.v

if(p.y<-10){
p.y=canvas.height+10
p.x=Math.random()*canvas.width
}

}

}

}

/* ---------------- LOOP ---------------- */

function animate(){

updateText()
drawParticles()

requestAnimationFrame(animate)

}

/* ---------------- INTRO BUTTON ---------------- */

startBtn.onclick=()=>{

intro.style.display="none"

centerName.style.opacity=1
centerName.style.transform="translate(-50%,-50%) scale(1.2)"

explodeHearts(window.innerWidth/2,window.innerHeight/2)

setTimeout(()=>{
centerName.style.opacity=0
},4000)

}

/* ---------------- RESIZE ---------------- */

window.addEventListener("resize",()=>{

resizeCanvas()
initText()

})

/* ---------------- START ---------------- */

resizeCanvas()
createParticles()
initText()

animate()