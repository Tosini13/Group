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
        this.group = new Group(props.name, 5, 1);
        this.group.tempStartEnd();
        this.rights = props.rights;
    }

    render() {
        //prerequisites
        //this.group.tempStartEnd();
        this.group.countTable();
        //this.group.showTable();

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
    render() {
        return (
            <div className="group">
                {this.props.mode}
                <GroupShow name={String.fromCharCode(65)} mode={this.props.mode} rights={this.props.rights} />
            </div>
        );
    }
}

// ========================================

function groupMode(mode, rights) {
    ReactDOM.render(
        <TournamentShow mode={mode} rights={rights} />,
        document.getElementById('my_react')
    );
}

