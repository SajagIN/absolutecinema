const c = document.getElementById('badAppleCanvas');
const ctx = c.getContext('2d');
const bgC = document.createElement('canvas');
const bgCtx = bgC.getContext('2d');
const fgC = document.createElement('canvas');
const fgCtx = fgC.getContext('2d');
let W = 0, H = 0, F = [], idx = 0;
const D = 66;
const credits = [
  'A Tribute To:','',
  'Bad Apple!! feat. nomico','',
  'Original Song: Bad Apple!!','Arrangement: Masayoshi Minoshima',
  'Vocals: nomico','Circle: Alstroemeria Records','Album: Lovelight','',
  'Original Video Animation:','Creator: Anira','Based on: Touhou Project','',
  'Created for Hack Club:','You Ship We Ship (YSWS)','Project: Cinema YSWS','',
  'Special Thanks:','FFmpeg for video processing','Sharp for Node.js image processing',
  'HTML Canvas for drawing magic','',
  'Presented for your enjoyment.','',
  'Thank You For Watching!'
];
let s = 0;
const LH = 30, SPD = 1, DEL = 200;
const FW = 600, FH = 400, PAD = 20;
const SHD = {col:'rgb(25, 24, 24)', blur:1000, off:15};
const OL = 'rgba(0, 0, 0, 0.71)';
const OFF = 0.2;
function init() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  bgC.width = c.width; bgC.height = c.height;
  fgC.width = W; fgC.height = H;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, c.width, c.height);
}
window.addEventListener('resize', init);
function draw(data, g, w, h) {
  if (!data.length || !W) return;
  g.clearRect(0, 0, w, h);
  g.fillStyle = '#fff';
  const px = w / W, py = h / H;
  data.forEach((v,i)=>{
    if (v) {
      const x = (i % W)*px;
      const y = Math.floor(i/W)*py;
      g.fillRect(x,y,px,py);
    }
  });
}
function drawBG() {
  draw(F[idx], bgCtx, bgC.width, bgC.height);
  ctx.drawImage(bgC,0,0);
  ctx.fillStyle = OL;
  ctx.fillRect(0,0,c.width,c.height);
}
function drawFG() {
  const bx = c.width/2 - FW/2 - c.width*OFF;
  const by = c.height/2 - FH/2;
  ctx.save();
  ctx.shadowColor = SHD.col;
  ctx.shadowBlur = SHD.blur;
  ctx.shadowOffsetX = SHD.off;
  ctx.shadowOffsetY = SHD.off;
  ctx.fillRect(bx,by,FW,FH);
  ctx.restore();
  draw(F[idx], fgCtx, W, H);
  ctx.drawImage(fgC,0,0,W,H,bx+PAD,by+PAD,FW-2*PAD,FH-2*PAD);
}
function drawCredits() {
  const cx = c.width/2;
  const ho = c.width*OFF;
  const tx = cx + ho + (c.width*(0.5-OFF)/2);
  ctx.fillStyle = '#F0F0F0';
  ctx.font = '20px Inter, sans-serif';
  ctx.textAlign = 'center';
  const startY = c.height - s + DEL;
  credits.forEach((l,i)=>{
    const y = startY + i*LH;
    if (y>-LH && y<c.height+LH) ctx.fillText(l,tx,y);
  });
  s = (s+SPD)%(credits.length*LH + c.height + DEL);
}
let last = 0;
function loop(t) {
  if (t - last > D) {
    idx = (idx+1)%F.length;
    last = t;
  }
  ctx.clearRect(0,0,c.width,c.height);
  drawBG(); drawFG(); drawCredits();
  requestAnimationFrame(loop);
}
async function load() {
  try {
    const r = await fetch('bad_apple_frames.json');
    if (!r.ok) throw 0;
    const d = await r.json();
    W = d.width; H = d.height; F = d.frames;
    if (F.length && W) {
      init();
      requestAnimationFrame(loop);
    }
  } catch {}
}
load();
