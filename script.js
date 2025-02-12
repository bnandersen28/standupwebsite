function showMember(memberId) {
    document.querySelectorAll('.member-detail').forEach(member => {
        member.style.display = 'none';
    });
    document.getElementById(memberId).style.display = 'flex';
}

function hideMember() {
    document.querySelectorAll('.member-detail').forEach(member => {
        member.style.display = 'none';
    });
    document.querySelector('.team-grid').style.display = 'grid';
}