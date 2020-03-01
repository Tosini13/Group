//CHECK - NOT NECESSARY

class TeamShow extends React.Component {
    constructor(props) {
        super(props);
        this.team = props.team;
        this.state = {
            name: this.team.name,
        }
        this.inputChange = this.inputChange.bind(this);
        this.teamName = React.createRef();
        this.saveChanges = this.saveChanges.bind(this);

        //NOT NECESSARY
        this.icon = 'icon-pencil';
    }

    inputChange(event) {
        if (this.props.rights === 'EDIT') {
            this.setState({ name: event.target.value });
        }

        //NOT NECESSARY
        this.icon = 'icon-soccer-ball';
    }

    saveChanges() {
        this.team.name = this.teamName.current.value;

        //NOT NECESSARY
        this.icon = 'icon-pencil';
    }

    componentDidUpdate(prevProps) {
        if (this.props.team !== prevProps.team) {
            this.team = this.props.team;
            this.setState({ name: this.props.team.name })
        }
    }

    render() {
        switch (this.props.rights) {
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
                <input className="team" type='text' value={this.state.name} onChange={this.inputChange} ref={this.teamName} />
                {this.piece}
            </div>
        );
    }
}

class MatchShow extends React.Component {
    constructor(props) {
        super(props);
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
        this.startMatch = this.startMatch.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match !== prevProps.match) {
            this.setState({ match: this.props.match });
        }
    }


    startMatch() {
        let match = this.state.match;
        if (this.state.match.mode == 2) {
            this.state.match.mode = 1;
            console.log('ten mecz już się zakończył! Ale wznawiam');
        } else if (this.state.match.mode == 1) {
            match.mode = 2;
            console.log('ten mecz jest już rozpoczęty');
        } else if (this.state.match.mode == 0) {
            match.mode = 1;
            match.result.home = 0;
            match.result.away = 0;
            //this.setState({ goalHome: 0 });
            //this.setState({ goalAway: 0 });
            console.log('Rozpoczynam mecz');
        }
        this.setState({ match: match });
    }

    addHomeGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalHome.current.value < 1000) {
                this.goalHome.current.value++;
                this.state.match.result.home = this.goalHome.current.value;
                //this.setState({ goalHome: this.goalHome.current.value });
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    lessHomeGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalHome.current.value > 0) {
                this.goalHome.current.value--;
                this.state.match.result.home = this.goalHome.current.value;
                //this.setState({ goalHome: this.goalHome.current.value });
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    addAwayGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalAway.current.value < 1000) {
                this.goalAway.current.value++;
                this.state.match.result.away = this.goalAway.current.value;
                //this.setState({ goalAway: this.goalAway.current.value });
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    lessAwayGoal() {
        if (this.state.match.mode == 1) {
            if (this.goalAway.current.value > 0) {
                this.goalAway.current.value--;
                this.state.match.result.away = this.goalAway.current.value;
                //this.setState({ goalAway: this.goalAway.current.value });
            }
        } else {
            console.log('Najpierw rozpocznij mecz');
        }
    }

    render() {
        let modeClass = '';
        if (this.state.match.mode == 1) {
            this.modeButton = <a onClick={this.startMatch}><i className='icon-record'></i></a>
            modeClass += 'matchLive';
        } else {
            this.modeButton = <a onClick={this.startMatch}><i className='icon-play'></i></a>
        }
        //MATCHES WITH UPDATING SCORE
        switch (this.props.rights) {
            case 'EDIT':
                this.piece =
                    <div className='matchDashboard'>
                        <a onClick={this.lessHomeGoal}><i className='icon-minus-circled'></i></a>
                        <a onClick={this.addHomeGoal}><i className='icon-plus-circled'></i></a>
                        {this.modeButton}
                        <a onClick={this.lessAwayGoal}><i className='icon-minus-circled'></i></a>
                        <a onClick={this.addAwayGoal}><i className='icon-plus-circled'></i></a>
                    </div>
                break;
            default:
                this.piece = '';
        }
        return (
            <div className={modeClass}>
                {this.piece}
                <div className='matchDatas'>
                    <TeamShow team={this.state.match.home} rights={false} />
                    <input className='goalHome goal' type='text' value={this.state.match.result.home} ref={this.goalHome} readOnly />
                    <i className='versus'>vs</i>
                    <input className='goalAway goal' type='text' value={this.state.match.result.away} ref={this.goalAway} readOnly />
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
    }

    render() {
        this.props.group.countTable();
        switch (this.props.mode) {
            case 'table':
                //TABLE
                let promotionCounter = 0;
                this.table = this.props.group.table.map((item, key) => {
                    this.tablePromoted = '';
                    if (promotionCounter < this.props.group.promotedQtt) {
                        this.tablePromoted += ' tablePromoted';
                    }
                    promotionCounter++;
                    return <tr className={this.tablePromoted}><td>{item.team.name}</td><td>{item.points}</td><td>{item.goalsScored}</td><td>{item.goalsLost}</td></tr>
                });
                return (
                    < div className='table' >
                        <table>
                            <thead><tr><th>Zespół</th><th>punkty</th><th>strzelone</th><th>stracone</th></tr></thead>
                            <tbody>
                                {this.table}
                            </tbody>
                        </table>
                    </div >
                );
                break;
            case 'matches':
                //MATCH LIST
                this.matches = this.props.group.matches.map((item, key) =>
                    <li>
                        <MatchShow match={item} rights={this.props.rights} />
                    </li>
                );
                return (
                    <div className='matches'>
                        <ul>
                            {this.matches}
                        </ul>
                    </div>
                );
                break;
            case 'teams':
                //TEAMS LIST
                this.teams = this.props.group.table.map((item, key) =>
                    <li><TeamShow team={item.team} rights={this.props.rights} /></li>
                );
                return (
                    <div className='teams'>
                        <ul>
                            {this.teams}
                        </ul>
                    </div>
                );
                break;
            case 'promote':
                //PROMOTED TEAMS
                let arr = this.props.group.promoteTeams();
                this.teams = arr.map((item, key) =>
                    <li className='promotedTeam'><TeamShow team={item} rights={false} /></li>
                );
                return (
                    <div className='promoted'>
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
            groupMode: 'table',
            groupCurrent: this.props.tournament.groups[0], //current group to display - default first
            groupName: this.props.tournament.groups[0].name,
        }
        this.changeGroup = this.changeGroup.bind(this);
        this.changeGroupName = this.changeGroupName.bind(this);
    }

    changeGroupName(event) {
        if (this.props.rights === 'EDIT') {
            this.setState({ groupName: event.target.value });
            this.state.groupCurrent.name = event.target.value;
        }
    }

    changeGroup(event) {
        this.setState({
            groupCurrent: this.props.tournament.groups[event.target.value],
            groupMode: 'table',
            groupName: this.props.tournament.groups[event.target.value].name,
        });
    }

    render() {
        //MATCH LIST
        this.groups = this.props.tournament.groups.map((item, key) =>
            <option value={key}>{item.name}</option>
        );

        // FOR GROUP NAME
        switch (this.props.rights) {
            case 'EDIT':
                this.piece = <a onClick={this.saveChanges}></a>
                this.inputMode = ''
                break;
            default:
                this.piece = '';
                this.inputMode = 'readonly';
        }
        this.groupName =
            <div>
                <input className="groupName" type='text' value={this.state.groupName} onChange={this.changeGroupName} />
                {this.piece}
            </div>

        return (
            <div className="group">
                <h2>{this.props.tournament.name}</h2>
                <select onChange={this.changeGroup}>
                    {this.groups}
                </select>
                {this.groupName}
                <ul>
                    <li><a onClick={() => this.setState({ groupMode: 'teams' })}>Drużyny</a></li>
                    <li><a onClick={() => this.setState({ groupMode: 'table' })}>Tabela</a></li>
                    <li><a onClick={() => this.setState({ groupMode: 'matches' })}>Mecze</a></li>
                    <li><a onClick={() => this.setState({ groupMode: 'promote' })}>Awans</a></li>
                </ul>
                <GroupShow group={this.state.groupCurrent} mode={this.state.groupMode} rights={this.props.rights} />
            </div>
        );
    }
}

class ManagerShow extends React.Component {
    tournament = null;
    // rights = 'EDIT';

    groupInit() {
        var no_teams = document.getElementsByName('no_teams')[0].value;
        var no_groups = document.getElementsByName('no_groups')[0].value;
        var bracketNo = document.getElementsByName('play_offs')[0].value;
        var returnGameGroup = document.getElementsByName('revange_group')[0].checked;
        this.tournament = new Tournament(no_teams, no_groups, bracketNo, returnGameGroup);
        this.tournament.name = document.getElementsByName('name')[0].value;
    }


    render() {
        this.groupInit();

        return (
            <TournamentShow tournament={this.tournament} rights={this.props.rights} />
        );
    }
}

// ========================================

function createGroup(rights) {
    document.querySelector('#formCreation').style.display = 'none';
    document.querySelector('#dashboardGroups').style.display = 'block';

    ReactDOM.render(
        <ManagerShow rights={rights} />,
        document.getElementById('dashboardGroups')
    );
}