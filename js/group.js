function groupInit(tournament) {
    var no_teams = document.getElementsByName('no_teams')[0].value;
    var no_groups = document.getElementsByName('no_groups')[0].value;
    var bracketNo = document.getElementsByName('play_offs')[0].value;
    tournament = new Tournament(no_teams, no_groups, bracketNo);
    tournament.name = document.getElementsByName('name')[0].value;

    document.querySelector('.formCreation').style.display = 'none';
    document.querySelector('.dashboardGroup').style.display = 'block';
}