//CHECK - NOT NECESSARY

class TeamShow extends React.Component {
    constructor(props) {
        super(props);
        this.team = props.team;
        this.rights = props.rights;
        this.state = {
            value: this.team.name,
        }
        this.inputChange = this.inputChange.bind(this);
        this.teamName = React.createRef();
        this.saveChanges = this.saveChanges.bind(this);

        //NOT NECESSARY
        this.icon = 'icon-pencil';
    }

    inputChange(event) {
        if (this.rights === 'EDIT') {
            this.setState({ value: event.target.value });
        }

        //NOT NECESSARY
        this.icon = 'icon-soccer-ball';
    }

    saveChanges() {
        this.team.name = this.teamName.current.value;

        //NOT NECESSARY
        this.icon = 'icon-pencil';
    }

    render() {
        switch (this.rights) {
            case 'EDIT':
                this.piece = <a onClick={this.saveChanges}><i className={this.icon}></i></a>
                this.inputMode = ''
                break;
            default:
                this.piece = '';
                this.inputMode = 'readonly';
        }
        return (
            <div>
                <input className="team" type='text' value={this.state.value} onChange={this.inputChange} ref={this.teamName} />
                {this.piece}
            </div>
        );
    }
}


class MatchShow extends React.Component {
    constructor(props) {
        super(props);
        this.rights = props.rights;
        this.state = {
            match: props.match,
        }



        //REFERENCES
        this.goalHome = React.createRef();
        this.addHomeGoal = this.addHomeGoal.bind(this);
        this.lessHomeGoal = this.lessHomeGoal.bind(this);
        this.goalAway = React.createRef();
        this.addAwayGoal = this.addAwayGoal.bind(this);
        this.lessAwayGoal = this.lessAwayGoal.bind(this);
    }

    addHomeGoal() {
        if (this.goalHome.current.value < 1000) {
            this.goalHome.current.value++;
            this.state.match.result.home = this.goalHome.current.value;
        }
    }

    lessHomeGoal() {
        if (this.goalHome.current.value > 0) {
            this.goalHome.current.value--;
            this.state.match.result.home = this.goalHome.current.value;
        }
    }

    addAwayGoal() {
        if (this.goalAway.current.value < 1000) {
            this.goalAway.current.value++;
            this.state.match.result.away = this.goalAway.current.value;
        }
    }

    lessAwayGoal() {
        if (this.goalAway.current.value > 0) {
            this.goalAway.current.value--;
            this.state.match.result.away = this.goalAway.current.value;
        }
    }

    render() {
        //MATCHES WITH UPDATING SCORE
        switch (this.rights) {
            case 'EDIT':
                this.piece =
                    <div className='matchDashboard'>
                        <a onClick={this.lessHomeGoal}><i className='icon-minus-circled'></i></a>
                        <a onClick={this.addHomeGoal}><i className='icon-plus-circled'></i></a>
                        <i>PLAY</i>
                        <a onClick={this.lessAwayGoal}><i className='icon-minus-circled'></i></a>
                        <a onClick={this.addAwayGoal}><i className='icon-plus-circled'></i></a>
                    </div>
                break;
            default:
                this.piece = '';
        }
        return (
            <div>
                {this.piece}
                <div className='matchDatas'>
                    <TeamShow team={this.state.match.home} rights={false} />
                    <input className='goalHome' type='text' value={this.state.match.result.home} ref={this.goalHome} readOnly />
                    vs
                    <input className='goalAway' type='text' value={this.state.match.result.away} ref={this.goalAway} readOnly />
                    <TeamShow team={this.state.match.away} rights={false} />
                </div>
            </div>
        );

        //MATCHES
        return (
            <div className='matchDatas'>
                <input type='text' value={this.state.match.home.name} readOnly />
                vs
                <input type='text' value={this.state.match.away.name} readOnly />
            </div>
        );

        //MATCHES WITH SCORE
        return (
            <div className='matchDatas'>
                <input type='text' value={this.state.match.home.name} readOnly />
                <input className='goalHome' type='text' value={this.state.match.result.home} readOnly />
                vs
                    <input className='goalAway' type='text' value={this.state.match.result.away} readOnly />
                <input type='text' value={this.state.match.away.name} readOnly />
            </div>
        );

    }
}


class GroupShow extends React.Component {
    constructor(props) {
        super(props);
        console.log('in group group: ' + this.props.group.name);
        this.group = this.props.group
        this.state = {
            group: this.props.group,
        }
        //this.group = props.group;
        this.group.tempStartEnd();
        this.rights = props.rights;
    }

    setGroup() {
        this.group = this.props.group
    }

    render() {
        this.setGroup();
        //prerequisites
        //this.group.tempStartEnd();
        this.group.countTable();
        //this.group.showTable();
        //console.log('in group group: ' + this.props.group);
        console.log('in group group: ' + this.props.group.name);
        console.log('in group: ' + this.state.group.name);
        switch (this.props.mode) {
            case 'table':
                //TABLE
                this.table = this.group.table.map((item, key) =>
                    <tr><td>{item.team.name}</td><td>{item.points}</td><td>{item.goalsScored}</td><td>{item.goalsLost}</td></tr>
                );
                return (
                    <div>
                        <h1>{this.group.name}</h1>
                        <table>
                            <thead><tr><th>Zespół</th><th>punkty</th><th>gole strzelone</th><th>gole stracone</th></tr></thead>
                            <tbody>
                                {this.table}
                            </tbody>
                        </table>
                    </div >
                );
                break;
            case 'matches':
                //MATCH LIST
                this.matches = this.group.matches.map((item, key) =>
                    <li>
                        <MatchShow match={item} rights={this.rights} />
                    </li>
                );
                return (
                    <div>
                        <h1>{this.group.name}</h1>
                        <ul>
                            {this.matches}
                        </ul>
                    </div>
                );
                break;
            case 'teams':
                //TEAMS LIST
                this.teams = this.group.table.map((item, key) =>
                    <li><TeamShow team={item.team} rights={this.rights} /></li>
                    // <input type='text' value={item.name} readOnly />
                );
                return (
                    <div>
                        <h1>{this.group.name}</h1>
                        <ul>
                            {this.teams}
                        </ul>
                    </div>
                );
                break;
            case 'promote':
                //PROMOTED TEAMS
                let arr = this.group.promoteTeams();
                this.teams = arr.map((item, key) =>
                    <li><TeamShow team={item} rights={false} /></li>
                );
                return (
                    <div>
                        <h1>{this.group.name}</h1>
                        <ul>
                            {this.teams}
                        </ul>
                    </div>
                );
                break;
        }
    }
}

class TournamentShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groupMode: 'matches',
            groupCurrent: this.props.tournament.groups[0], //current group to display - default first
            rights: this.props.rights,
        }
        this.changeGroup = this.changeGroup.bind(this);
    }

    changeGroup(event) {
        this.setState({ groupCurrent: this.props.tournament.groups[event.target.value] });
    }

    render() {
        //MATCH LIST
        this.groups = this.props.tournament.groups.map((item, key) =>
            <option value={key}>{item.name}</option>
        );
        console.log(this.state.groupCurrent.name);
        return (
            <div className="group">
                {this.props.tournament.name}
                {this.state.groupCurrent.name}
                <select onChange={this.changeGroup}>
                    {this.groups}
                </select>
                <ul>
                    <li><a onClick={() => this.setState({ groupMode: 'teams' })}>Edytuj?s drużyny</a></li>
                    <li><a onClick={() => this.setState({ groupMode: 'table' })}>Tabela</a></li>
                    <li><a onClick={() => this.setState({ groupMode: 'matches' })}>Mecze</a></li>
                    <li><a onClick={() => this.setState({ groupMode: 'promote' })}>Awans</a></li>
                </ul>
                <GroupShow group={this.state.groupCurrent} mode={this.state.groupMode} rights={this.state.rights} />
            </div>
        );
    }
}

class ManagerShow extends React.Component {
    tournament = null;
    rights = 'EDIT';

    groupInit() {
        var no_teams = document.getElementsByName('no_teams')[0].value;
        var no_groups = document.getElementsByName('no_groups')[0].value;
        var bracketNo = document.getElementsByName('play_offs')[0].value;
        this.tournament = new Tournament(no_teams, no_groups, bracketNo);
        this.tournament.name = document.getElementsByName('name')[0].value;

        // document.querySelector('.formCreation').style.display = 'none';
        // document.querySelector('#dashboardGroup').style.display = 'block';
    }


    render() {
        this.groupInit();

        return (
            <div className='dashboardGroup'>
                <TournamentShow tournament={this.tournament} rights={this.rights} />
            </div>
        );
    }
}

// ========================================

function createGroup(rights) {
    document.querySelector('.formCreation').style.display = 'none';
    document.querySelector('#dashboardGroups').style.display = 'block';

    ReactDOM.render(
        <ManagerShow rights={rights} />,
        document.getElementById('dashboardGroups')
    );
}

// groupMode(mode, rights) {
//     ReactDOM.render(
//         <TournamentShow tournament={tournament} mode={mode} rights={rights} />,
//         document.getElementById('my_react')
//     );
// }