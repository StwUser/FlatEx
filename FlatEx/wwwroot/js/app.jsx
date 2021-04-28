class UserLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", surname: ""};

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
        var userName = this.state.name.trim();
        var userSurname = this.state.surname.trim();
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
                swal("you are logged in", "you have access to the user's personal account and the submission of ads", "success");

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
                           placeholder="Name"
                           value={this.state.name}
                           onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="text"
                           placeholder="Surname"
                           value={this.state.surname}
                        onChange={this.onSurnameChange} />
                </p>
                <input type="submit" value="Sign in" />
            </form>
        );
    }
}

ReactDOM.render(
    <UserLoginForm apiUrl="/login" />,
    document.getElementById("login")
);

class UserRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", surname: "", email: "" };

        this.onSubmitRegister = this.onSubmitRegister.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onSurnameChange(e) {
        this.setState({ surname: e.target.value });
    }
    onEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    onSubmitRegister(e) {
        e.preventDefault();
        var userName = this.state.name.trim();
        var userSurname = this.state.surname.trim();
        var userEmail = this.state.email.trim();

        if (!userName || !userSurname || !userEmail) {
            return;
        }
        this.addUser(userName, userSurname, userEmail);
    }
    addUser(userName, userSurname, userEmail) {
        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.apiUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status === 200) {
                swal("user created", "", "success");
            }
        }.bind(this);
        xhr.send(`{"name": "${userName}", "surname": "${userSurname}", "email": "${userEmail}"}`);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitRegister}>
                <p>
                    <input type="text"
                           placeholder="Name"
                           value={this.state.name}
                           onChange={this.onNameChange} />
                </p>
                <p>
                    <input type="text"
                           placeholder="Surname"
                           value={this.state.surname}
                           onChange={this.onSurnameChange} />
                </p>
                <p>
                    <input type="text"
                           placeholder="Email"
                           value={this.state.email}
                           onChange={this.onEmailChange} />
                </p>
                <input type="submit" value="Register" />
            </form>
        );
    }
}

ReactDOM.render(
    <UserRegistrationForm apiUrl="/user" />,
    document.getElementById("registration")
);
