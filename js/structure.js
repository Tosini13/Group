// class Manager {
//     Tournament = null;

//     groupInit() {
//         var no_teams = document.getElementsByName('no_teams')[0].value;
//         var no_groups = document.getElementsByName('no_groups')[0].value;
//         var bracketNo = document.getElementsByName('play_offs')[0].value;
//         this.tournament = new Tournament(no_teams, no_groups, bracketNo);
//         this.tournament.name = document.getElementsByName('name')[0].value;

//         document.querySelector('.formCreation').style.display = 'none';
//         document.querySelector('.dashboardGroup').style.display = 'block';
//     }
// }


class Tournament {
    name = null;
    teamsQtt = null;
    groupsQtt = null;
    teams = [];         //can't be two teams with the same name!!!
    groups = [];        //important keys of array - to identify group!
    firstRound = null;  //1-final;2-semi;4-quater;8-1/16;16-1/32
    returnGameGroup = false;

    //SET
    setGroupQtt(arg) {
        if (arg > this.teamsQtt) {
            this.groupsQtt = parseInt(this.teamsQtt);
        } else {
            this.groupsQtt = parseInt(arg);
        }
    };

    setFirstRound(arg) {
        //FOR HYBRID - GROUP & BRACKET
        if (arg % 4 == 0 || arg == 1 || arg == 2) {
            //if arg is in required number structure, but still not good root modulo
            while (arg * 2 > this.teamsQtt) {
                //when there's more play offs than participants
                arg /= 2;
            }
            if (arg * 2 < this.groupsQtt) {
                arg = this.groupsQtt / 2;
            }
            //$this->play_offs_qtt = $arg / 2;
            this.firstRound = arg;
        } else {
            return false;
        }
    }

    //FUNCTIONS


    createGroups() {
        let restTeams = 0;
        let add = 0;
        if (this.groupsQtt != 1) {
            restTeams = this.teamsQtt % this.groupsQtt;
        }
        for (let i = 0; i < this.groupsQtt; i++) {
            //check if it will be the same amount of teams or not
            if (restTeams != 0) {
                add = 1;
                restTeams--;
            } else {
                add = 0;
            }
            //how many teams should to be in particular group
            let group = new Group(String.fromCharCode(65 + i), Math.floor(this.teamsQtt / this.groupsQtt) + add, this.firstRound, this.returnGameGroup);
            this.groups.push(group);

            //temp:
            group.showTable();
            group.showMatches();
        }
    }

    constructor(teamsQtt, groupsQtt, firstRound, returnGameGroup) {
        this.teamsQtt = parseInt(teamsQtt);
        this.returnGameGroup = returnGameGroup;
        this.setGroupQtt(groupsQtt);
        this.setFirstRound(firstRound);
        this.createGroups();
    }
}

class Group {
    name = null;
    teamsQtt = null;
    promotedQtt = null; //color table rows?!
    matches = [];       //important keys of array - to identify match!?
    table = [];         //array that contains teams, points, goals


    //FUNCTIONS

    tableInit = function () {
        for (let i = 0; i < this.teamsQtt; i++) {
            var row = {
                team: new Team('Zespół nr ' + (i + 1) + " z " + this.name),
                points: null,
                goalsScored: null,
                goalsLost: null
            }
            this.table.push(row);
        }
    }

    matchesInit(returnGame) {
        for (let i = 0; i < this.table.length - 1; i++) {
            for (let j = i + 1; j < this.table.length; j++) {
                let match;
                match = new Match();
                match.home = this.table[i].team;
                match.away = this.table[j].team;
                this.matches.push(match);
            }
        }
        if (returnGame) {
            for (let i = 0; i < this.table.length - 1; i++) {
                for (let j = i + 1; j < this.table.length; j++) {
                    let match;
                    match = new Match();
                    match.home = this.table[j].team;
                    match.away = this.table[i].team;
                    this.matches.push(match);
                }
            }
        }
    }

    sortTable(a, b) {
        //POINTS
        if (a.points === b.points) {
            //+/-
            let diffrenceA = a.goalsScored - a.goalsLost;
            let diffrenceB = b.goalsScored - b.goalsLost;
            if (diffrenceA === diffrenceB) {
                //SCORED
                if (a.goalsScored === b.goalsScored) {
                    //LOST
                    if (a.goalsLost === b.goalsLost) {
                        //TEAM NAME
                        if (a.team.name.localeCompare(b.team.name) == 0) {
                            //ADD DIRECT RESULT!
                            return 0;
                        }
                        else {
                            //OR ASK ADMIN!!!
                            return (a.team.name.localeCompare(b.team.name) < 0) ? -1 : 1;
                        }
                    }
                    else {
                        return (a.goalsLost > b.goalsLost) ? -1 : 1;
                    }
                }
                else {
                    return (a.goalsScored > b.goalsScored) ? -1 : 1;
                }
            }
            else {
                return (diffrenceA > diffrenceB) ? -1 : 1;
            }
        }
        else {
            return (a.points > b.points) ? -1 : 1;
        }
    }

    clearTable() {
        for (let row of this.table) {
            row.points = parseInt(0);
            row.goalsScored = parseInt(0);
            row.goalsLost = parseInt(0);
        }
    }

    countTable() {
        this.clearTable();
        let begunGroup = false; //check if group has begun
        for (let match of this.matches) {
            if (match.status == 2) {
                begunGroup = true;
                for (let row of this.table) {
                    if (row.points == null) {
                        console.log("Matches didn't start!!");
                    }
                    //team is host
                    if (match.home == row.team) {
                        //add points
                        if (match.result.home > match.result.away) {
                            row.points += parseInt(3);
                        } else if (match.result.home == match.result.away) {
                            row.points += parseInt(1);
                        }
                        //goal balance
                        row.goalsScored += parseInt(match.result.home);
                        row.goalsLost += parseInt(match.result.away);
                    }
                    //team is host
                    if (match.away == row.team) {
                        //add points
                        if (match.result.home < match.result.away) {
                            row.points += parseInt(3);
                        } else if (match.result.home == match.result.away) {
                            row.points += parseInt(1);
                        }
                        //goal balance
                        row.goalsScored += parseInt(match.result.away);
                        row.goalsLost += parseInt(match.result.home);
                    }
                }
            }
        }
        if (begunGroup) {
            this.table.sort(this.sortTable);
        } else {
            this.clearTable();
        }
    }

    promoteTeams() {
        this.countTable();
        let promoted = [];
        let counter = 0;
        for (let row of this.table) {
            if (counter > this.promotedQtt) {
                break;
            }
            promoted.push(row.team);
            counter++;
        }
        return promoted;
    }

    constructor(name, teamsQtt, promotedQtt, returnGame) {
        this.name = name;
        this.teamsQtt = teamsQtt;
        this.promotedQtt = promotedQtt;
        this.tableInit();
        this.matchesInit(returnGame);
    }

    //temp
    showTable() {
        this.countTable();
        console.log("grupa: " + this.name);
        for (let v of this.table) {
            console.log("team: " + v.team.name + " points: " + v.points + " scored: " + v.goalsScored + " lost: " + v.goalsLost);
        }
    }
    showMatches() {
        for (let v of this.matches) {
            console.log("Matches: " + v.home.name + " - " + v.away.name);
        }
    }
    tempStartEnd() {
        for (let v of this.matches) {
            v.startMatch();
            v.endMatch();
        }
    }

}

class Match {
    home = null;
    away = null;
    result = {
        home: null,
        away: null,
    }; //[0]-home;[1]-away
    status = 0; //0-not_tarted;1-started;2-finished

    constructor(home, away) {
        this.home = home;
        this.away = away;
    }

    startMatch() {
        if (this.status == 2) {
            //alert('ten mecz już się zakończył!');
            console.log('ten mecz już się zakończył!');
        } else {
            this.status = 1;
            this.result.home = 0;
            this.result.away = 0;
        }
        return false;
    }

    endMatch() {
        if (this.status == 0) {
            alert('ten mecz jeszcze się nie rozpoczął!');
        } else {
            this.status = 2;
        }
        return false;
    }

    goalValidity() {
        if (this.status == 1) {
            return true;
        } else if (this.status == 0) {
            alert('Mecz się nie rozpoczął');
        } else if (this.status == 2) {
            alert('Mecz się już zaokńczył');
        }
        return false;
    }

    goalHome() {
        if (this.goalValidity) {
            this.result.home++;
        } else {
            return false;
        }
    }

    goalAway() {
        if (this.goalValidity) {
            this.result.away++;
        } else {
            return false;
        }
    }
}

class Team {
    id;//?
    name;

    constructor(name) {
        this.name = name;
    }
}