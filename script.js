const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const resultCard = document.getElementById("resultCard");
const scoreText = document.getElementById("scoreText");
const planList = document.getElementById("planList");
const checklist = [...document.querySelectorAll("#checklist input[type='checkbox']")];

const adviceByKeyword = [
  "GBP profiline haftada en az 2 görsel ve 2 güncelleme ekle.",
  "Yorum isteyen kısa bir WhatsApp/SMS akışı oluştur.",
  "Olumsuz yorumlar için 1 saat içinde dönüş şablonu hazırla.",
  "Hizmet + ilçe bazlı açılış sayfalarını iç linklerle güçlendir.",
  "NAP bilgisini web site, sosyal medya ve dizinlerde birebir eşitle.",
  "Sadece gerçek müşteri yorumları iste; sahte yorumlardan kaçın.",
];

function getScore() {
  const totalWeight = checklist.reduce((sum, item) => sum + Number(item.dataset.weight), 0);
  const checkedWeight = checklist
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + Number(item.dataset.weight), 0);

  return Math.round((checkedWeight / totalWeight) * 100);
}

function generatePlan(score) {
  const name = document.getElementById("businessName").value.trim() || "İşletmen";
  const location = document.getElementById("location").value.trim() || "hedef bölgen";
  const service = document.getElementById("service").value.trim() || "ana hizmetin";
  const weeklyTarget = Number(document.getElementById("weeklyTarget").value || 3);

  const missingChecks = checklist
    .filter((item) => !item.checked)
    .map((item) => item.parentElement.textContent.trim())
    .slice(0, 4);

  const plan = [
    `${name} için ${location} bölgesinde "${service}" odaklı içerik planı hazırla. Haftalık hedef: ${weeklyTarget} içerik.`,
    ...missingChecks.map((m) => `Eksik alanı tamamla: ${m}.`),
    ...adviceByKeyword.slice(0, score < 50 ? 4 : 2),
  ];

  return plan.slice(0, 7);
}

calculateBtn.addEventListener("click", () => {
  const score = getScore();
  const plan = generatePlan(score);

  let level = "Başlangıç";
  if (score >= 75) level = "Güçlü";
  else if (score >= 50) level = "Orta";

  scoreText.textContent = `Yerel SEO skorun: ${score}/100 (${level})`;
  planList.innerHTML = "";
  plan.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    planList.appendChild(li);
  });

  resultCard.hidden = false;
});

resetBtn.addEventListener("click", () => {
  document.getElementById("businessName").value = "";
  document.getElementById("location").value = "";
  document.getElementById("service").value = "";
  document.getElementById("weeklyTarget").value = 3;
  checklist.forEach((item) => {
    item.checked = false;
  });
  resultCard.hidden = true;
});
