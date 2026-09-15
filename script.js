// ตรวจสอบระบบล็อกอินผ่านอีเมลสวนดุสิต
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email-input');
const loginMsg = document.getElementById('login-msg');

const loginSection = document.getElementById('login-section');
const mainSection = document.getElementById('main-section');
const userEmailSpan = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');

// ข้อมูลจำลองรายการปาร์ตี้
let parties = [
    { id: 1, host: 'student1@mail.dusit.ac.th', origin: 'หน้าตึก 11', destination: 'MRT บางพลัด', time: '16:30', seats: 2 },
    { id: 2, host: 'student2@mail.dusit.ac.th', origin: 'ฝั่งศูนย์อาหารสวนดุสิต', destination: 'BTS อนุสาวรีย์ชัยฯ', time: '17:00', seats: 1 }
];

// 1. ระบบยืนยันอีเมลมหาวิทยาลัย
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim().toLowerCase();

    if (email.endsWith('@mail.dusit.ac.th')) {
        loginMsg.innerText = '';
        userEmailSpan.innerText = email;
        loginSection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        renderParties();
    } else {
        loginMsg.innerText = 'กรุณาใช้อีเมลมหาวิทยาลัย (@mail.dusit.ac.th) เท่านั้น!';
    }
});

// ออกจากระบบ
logoutBtn.addEventListener('click', () => {
    mainSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
    emailInput.value = '';
});

// 2. ระบบเพิ่มปาร์ตี้เดินทาง (ดึงค่าจากช่องพิมพ์โดยตรง)
const partyForm = document.getElementById('party-form');

partyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newParty = {
        id: Date.now(),
        host: userEmailSpan.innerText,
        origin: document.getElementById('origin').value.trim(),
        destination: document.getElementById('destination').value.trim(),
        time: document.getElementById('departure-time').value,
        seats: parseInt(document.getElementById('seats').value)
    };

    parties.unshift(newParty);
    renderParties();
    partyForm.reset();
    alert('สร้างปาร์ตี้เรียบร้อยแล้ว!');
});

// 3. แสดงรายการปาร์ตี้บนหน้าเว็บ
function renderParties() {
    const partyList = document.getElementById('party-list');
    partyList.innerHTML = '';

    if (parties.length === 0) {
        partyList.innerHTML = '<p>ยังไม่มีปาร์ตี้ในขณะนี้</p>';
        return;
    }

    parties.forEach(party => {
        const item = document.createElement('div');
        item.className = 'party-item';
        item.innerHTML = `
            <h4>${party.origin} ➔ ${party.destination}</h4>
            <p><strong>เวลาล้อหมุน:</strong> ${party.time} น.</p>
            <p><strong>ผู้สร้าง:</strong> ${party.host}</p>
            <p><strong>ต้องการอีก:</strong> ${party.seats} คน</p>
            <button onclick="joinParty(${party.id})" class="btn-success" ${party.seats === 0 ? 'disabled' : ''}>
                ${party.seats > 0 ? 'เข้าร่วมปาร์ตี้ (หารค่ารถ)' : 'เต็มแล้ว'}
            </button>
        `;
        partyList.appendChild(item);
    });
}

// 4. ระบบกด Join ปาร์ตี้
function joinParty(id) {
    const party = parties.find(p => p.id === id);
    if (party && party.seats > 0) {
        party.seats -= 1;
        renderParties();
        alert(`เข้าร่วมปาร์ตี้สำเร็จ! ติดต่อผู้สร้างปาร์ตี้ได้ที่: ${party.host}`);
    }
}