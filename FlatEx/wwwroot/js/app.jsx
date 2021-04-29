class UserLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", surname: "" };

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
        if (userName !== undefined && userSurname !== undefined) {

            var xhr = new XMLHttpRequest();
            xhr.open("get", `${this.props.apiUrl}?name=${userName}&surname=${userSurname}`, true);
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                window.userId = data.id;
                window.name = data.name;
                window.surname = data.surname;
                window.email = data.email;

                if (data.id !== 0)
                    swal("you are logged in",
                        "you have access to the user's personal account and the submission of ads",
                        "success");

                if (data.id === 0)
                    swal("user isn't exists", "", "error");

            }.bind(this);
            xhr.send();
        }
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
        var name = props.name;
        var nameIsValid = this.validateName(name);
        var surname = props.surname;
        var surnameIsValid = this.validateName(surname);
        var email = props.email;
        var emailIsValid = this.validateEmail(email);

        this.state = { name: "", nameValid: nameIsValid, surname: "", surnameValid: surnameIsValid, email: "", emailValid: emailIsValid };

        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onSubmitRegister = this.onSubmitRegister.bind(this);
    }
    validateName(name) {
        if (name === undefined || name === null)
            return false;
        return name.length > 2 && name.length < 20;
    }
    validateSurname(surname) {
        if (surname === undefined || surname === null)
            return false;
        return surname.length > 2 && surname.length < 20;
    }
    validateEmail(email) {
        if (email === undefined || email === null)
            return false;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onNameChange(e) {
        var val = e.target.value;
        var valid = this.validateName(val);
        this.setState({ name: val, nameValid: valid });
    }
    onSurnameChange(e) {
        var val = e.target.value;
        var valid = this.validateSurname(val);
        this.setState({ surname: val, surnameValid: valid });
    }
    onEmailChange(e) {
        var val = e.target.value;
        var valid = this.validateEmail(val);
        this.setState({ email: val, emailValid: valid });
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
        // validation
        var nameColor = this.state.nameValid === true ? "green" : "red";
        var surnameColor = this.state.surnameValid === true ? "green" : "red";
        var emailColor = this.state.emailValid === true ? "green" : "red";
        var btnDisabled = true;
        if (this.state.nameValid && this.state.surnameValid && this.state.emailValid)
            btnDisabled = false;
        else
            btnDisabled = true;

        return (
            <form onSubmit={this.onSubmitRegister}>
                <p>
                    <input type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.onNameChange}
                        style={{ borderColor: nameColor }} />
                </p>
                <p>
                    <input type="text"
                        placeholder="Surname"
                        value={this.state.surname}
                        onChange={this.onSurnameChange}
                        style={{ borderColor: surnameColor }} />
                </p>
                <p>
                    <input type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                        style={{ borderColor: emailColor }} />
                </p>
                <input id="btnRegister" type="submit" value="Register" disabled={btnDisabled} />
            </form>
        );
    }
}

ReactDOM.render(
    <UserRegistrationForm apiUrl="/user" />,
    document.getElementById("registration")
);

class ApartmentOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.apartmentOffer };

        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <div>
            <p><b>id</b> {this.state.data.id}  | <b>title</b> {this.state.data.title}  | <b>content</b> {this.state.data.content}  | <b>square</b>  | {this.state.data.square}m  | <b>address</b> {this.state.data.address}  | <b>price</b> {this.state.data.price} USD  | <button onClick={this.onClick} style={{"borderRadius" : "2px"}}>delete</button></p>
               </div>;
    }
}

class ApartmentOfferList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { apartmentOffers: [] };
        
        this.onRemoveApartmentOffer = this.onRemoveApartmentOffer.bind(this);
    }
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + "/" + window.userId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ apartmentOffers: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    onRemoveApartmentOffer(apartmentOffer) {
 
        if (apartmentOffer) {
            var url = this.props.apiUrl + "/" + apartmentOffer.id;
             
            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    render() {
        var remove = this.onRemoveApartmentOffer;
        return <div>
               <span><b>My apartments for offer</b></span>
                   <div>
                        {
                          this.state.apartmentOffers.map(function (apartmentOffer) {

                          return <ApartmentOffer key={apartmentOffer.id} apartmentOffer={apartmentOffer} onRemove={remove} />
                          })
                        }
                    </div>
               </div>;
    }
}

class ApartmentDemand extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.apartmentDemand };

        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        this.props.onRemove(this.state.data);
    }
    render() {
        return <div>
            <p><b>id</b> {this.state.data.id}  | <b>title</b> {this.state.data.title}  | <b>content</b> {this.state.data.content}  | <b>square</b>  | {this.state.data.square}m  | <b>prefere address</b> {this.state.data.prefereAddress}  | <b>price cap</b> {this.state.data.priceCap} USD  | <button onClick={this.onClick} style={{"borderRadius" : "2px"}}>delete</button></p>
               </div>;
    }
}

class ApartmentDemandList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { apartmentDemands: [] };
        
        this.onRemoveApartmentDemand = this.onRemoveApartmentDemand.bind(this);
    }
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open("get", this.props.apiUrl + "/" + window.userId, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ apartmentDemands: data });
        }.bind(this);
        xhr.send();
    }
    componentDidMount() {
        this.loadData();
    }
    onRemoveApartmentDemand(apartmentDemand) {
 
        if (apartmentDemand) {
            var url = this.props.apiUrl + "/" + apartmentDemand.id;
             
            var xhr = new XMLHttpRequest();
            xhr.open("delete", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    this.loadData();
                }
            }.bind(this);
            xhr.send();
        }
    }
    render() {
        var remove = this.onRemoveApartmentDemand;
        return <div>
               <span><b>My apartments for demand</b></span>
                   <div>
                        {
                          this.state.apartmentDemands.map(function (apartmentDemand) {

                          return <ApartmentDemand key={apartmentDemand.id} apartmentDemand={apartmentDemand} onRemove={remove} />
                          })
                        }
                    </div>
               </div>;
    }
}

class UserCabinetForm extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <div>
                <p>User personal info:    name - {window.name}  surname - {window.surname}  email - {window.email}</p>
                <ApartmentOfferList apiUrl="/Apartment/Offers" />
                <ApartmentDemandList apiUrl="/Apartment/Demands" />
        </div>;
    }
}

function renderCabinet() {
    window.ReactDOM.render(
        <UserCabinetForm apiUserUrl="/user" apiUrl="/user" />,
        document.getElementById("personalCabinet")
    );
}