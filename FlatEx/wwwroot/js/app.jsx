class UserLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { id: 0, name: "", surname: ""};

        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onSurnameChange(e) {
        this.setState({ surname: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        var userName = this.state.name;
        var userSurname = this.state.surname;
        if (!userName || !userSurname) {
            return;
        }
        this.setState({ name: "", surname: "" });
        this.login(userName, userSurname);
    }
    login(userName, userSurname) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", `${this.props.apiUrl}?name=${userName}&surname=${userSurname}`, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            window.userId = data;

            if (data !== 0)
                alert("Personal cabinet");
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.login();
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <p>
                    <input type="text"
                           placeholder="Имя"
                           value={this.state.name}
                           onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="text"
                           placeholder="Фамилия"
                           value={this.state.surname}
                        onChange={this.onSurnameChange} />
                </p>
                <input type="submit" value="Войти" />
            </form>
        );
    }
}

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ users: data });
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        console.log(this.state.users);
        return <div>hello</div>;
    }
}

ReactDOM.render(
    <UserLoginForm apiUrl="/login" />,
    document.getElementById("login")
);

