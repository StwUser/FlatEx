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
                swal("user created", "now you can sign in system", "success");

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

        this.onClickDelete = this.onClickDelete.bind(this);
        this.onIsReservedChange = this.onIsReservedChange.bind(this);
    }
    onClickDelete(e) {
        this.props.onRemove(this.state.data);
    }
    onIsReservedChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value);
        this.setState({ isReserved : value });
        console.log();
        this.state.data.isReserved = value;
        this.updateUser();
    }
    updateUser() {
        var xhr = new XMLHttpRequest();
        xhr.open("put", "/Apartment/Offers" + "/" + window.userId, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status === 200) {

            }
        }.bind(this);
        xhr.send(JSON.stringify(this.state.data));
    }
    render() {
        return <div>
            <p><b>id</b> {this.state.data.id}  | <b>title</b> {this.state.data.title}  | <b>content</b> {this.state.data.content}  | <b>square</b>  | {this.state.data.square}m  | <b>address</b> {this.state.data.address}  | <b>price</b> {this.state.data.price} USD  | <b>reserve</b> <input name="isReserved" type="checkbox" checked={this.state.data.isReserved} onChange={this.onIsReservedChange} />  | <button onClick={this.onClickDelete} style={{"borderRadius" : "2px"}}>delete</button></p>
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
    componentDidUpdate() {
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
    componentDidUpdate() {
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
                <p>User personal info:    name - <b>{window.name}</b>  surname - <b>{window.surname}</b>  email - <b>{window.email}</b></p>
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

class ApartmentRegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: "", content: "", square: "", address : "", price : "" };

        this.onSubmitRegister = this.onSubmitRegister.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onSquareChange = this.onSquareChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
    }
    onTitleChange(e) {
        this.setState({ title: e.target.value });
    }
    onContentChange(e) {
        this.setState({ content: e.target.value });
    }
    onSquareChange(e) {
        this.setState({ square: e.target.value });
    }
    onAddressChange(e) {
        this.setState({ address: e.target.value });
    }
    onPriceChange(e) {
        this.setState({ price: e.target.value });
    }    
    onSubmitRegister(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var content = this.state.content.trim();
        var square = this.state.square;
        var address = this.state.address.trim();
        var price = this.state.price;

        if (!title || !content || !address) {
            return;
        }
        this.addUser(title, content, square, address, price);
    }
    addUser(title, content, square, address, price) {
        var xhr = new XMLHttpRequest();
        xhr.open("post", this.props.apiUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhr.onload = function () {
            if (xhr.status === 200) {
                swal("offer created", "", "success");
            }
        }.bind(this);
        xhr.send(`{"userId" : "${window.userId}", "title": "${title}", "content": "${content}", "square": "${square}", "${this.props.fAddress}" : "${address}", "${this.props.fPrice}" : "${price}"}`);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitRegister}>
                <p>
                    <input type="text"
                           placeholder="Title"
                           value={this.state.title}
                           onChange={this.onTitleChange} />
                </p>
                <p>
                    <input type="text"
                           placeholder="Content"
                           value={this.state.content}
                           onChange={this.onContentChange} />
                </p>
                <p>
                    <input type="number" min="0" step="1" 
                           placeholder="Square"
                           value={this.state.square}
                           onChange={this.onSquareChange} 
                           style={{"WebkitAppearance" : "none", "margin" : "0", "MozAppearance" : "textfield"}} />
                </p>
                <p>
                    <input type="text"
                           placeholder={this.props.pAddress}
                           value={this.state.address}
                           onChange={this.onAddressChange} />
                </p>
                <p>
                    <input type="number" min="0" step="1"
                           placeholder={this.props.pPrice}
                           value={this.state.price}
                           onChange={this.onPriceChange} 
                           style={{"WebkitAppearance" : "none", "margin" : "0", "MozAppearance" : "textfield"}} />
                </p>
                <input type="submit" value="Add" />
            </form>
        );
    }
}

class UserSubmittingAdForm extends React.Component {
    constructor(props){
        super(props); 
    }
    render() {
        return (
          <div> 
              <div style={{"width" : "49%", "float" : "left"}}>
                  <p><b>Add apartment offer</b></p>
                  <ApartmentRegistrationForm apiUrl="/Apartment/Offers" fAddress="address" fPrice="price" pAddress="Address" pPrice="Price" />
              </div>
              <div style={{"width" : "49%", "float" : "left"}}>
                  <p><b>Add apartment demand</b></p>
                  <ApartmentRegistrationForm apiUrl="/Apartment/Demands" fAddress="preferAddress" fPrice="priceCap" pAddress="Prefer address" pPrice="PriceCap" />
              </div>
          </div>
        );
    }
}

function renderAds(){
    window.ReactDOM.render(
        <UserSubmittingAdForm />,
        document.getElementById("ads")
    );
}

class UserSearchForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { apartments: [], value: "offers", squareFrom: "", squareTo: "", priceFrom : "", priceTo : "", district : "" , pages : 0 };

        this.handleChange = this.handleChange.bind(this);
        this.onSquareFromChange = this.onSquareFromChange.bind(this);
        this.onSquareToChange = this.onSquareToChange.bind(this);
        this.onPriceFromChange = this.onPriceFromChange.bind(this);
        this.onPriceToChange = this.onPriceToChange.bind(this);
        this.onDistrictChange = this.onDistrictChange.bind(this);
        this.loadApartmens = this.loadApartmens.bind(this);
        this.getNumberOfPages = this.getNumberOfPages.bind(this);
    }
    handleChange(event) {    
        this.setState({value: event.target.value});
        this.getNumberOfPages();     
    }
    onSquareFromChange(e) {
        this.setState({ squareFrom: e.target.value });
    } 
    onSquareToChange(e) {
        this.setState({ squareTo: e.target.value });
    } 
    onPriceFromChange(e) {
        this.setState({ priceFrom: e.target.value });
    }     
    onPriceToChange(e) {
        this.setState({ priceTo: e.target.value });
    }
    onDistrictChange(e) {
        this.setState({ district: e.target.value });
    }
    getNumberOfPages(){
        if(this.state.value == "offers")
            var apiUrl = "/Apartment/Offers";
        else if(this.state.value == "demands")
            var apiUrl = "/Apartment/Demands";

        var xhr = new XMLHttpRequest();
            xhr.open("get", apiUrl + "/Getpagescount", true); 
            
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                this.setState({ pages: data });
            }.bind(this);
            xhr.send();    
    }         
    componentDidMount() {
        this.getNumberOfPages();
    }
    loadApartmens(pageNumber) {
        console.log(pageNumber);

        var queryString = `?squareFrom=${this.state.squareFrom}&squareTo=${this.state.squareTo}&priceFrom=${this.state.priceFrom}&priceTo=${this.state.priceTo}&district=${this.state.district}&page=${pageNumber}`;

        console.log(queryString);

        if(this.state.value == "offers")
            var apiUrl = "/Apartment/Offers";
        else if(this.state.value == "demands")
            var apiUrl = "/Apartment/Demands";

        var xhr = new XMLHttpRequest();
        xhr.open("get", apiUrl + queryString, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            this.setState({ apartments: data });
        }.bind(this);
        xhr.send();
    }   
    render() {
        var buttons = [];
        for (let i = 1; i <= this.state.pages; ++i) {
            buttons.push(<button key={i} onClick={() => this.loadApartmens(i)}>{i}</button>);
        }

        return (
            
          <div> 
              <select value={this.state.value} onChange={this.handleChange} style={{"margin" : "6px 2px 0 3px", "height" : "21px"}}>
                <option value="demands">search in Demands</option>
                <option value="offers">search in Offers</option>
              </select>
              <input type="number" placeholder="Square from" value={this.state.squareFrom} onChange={this.onSquareFromChange} style={{ "width" : "75px", "WebkitAppearance" : "none", "margin" : "0", "MozAppearance" : "textfield"}} />
              <input type="number" placeholder="Square to" value={this.state.squareTo} onChange={this.onSquareToChange} style={{ "width" : "75px", "WebkitAppearance" : "none", "margin" : "0 0 0 2px", "MozAppearance" : "textfield"}} />
              <input type="number" placeholder="Price from" value={this.state.priceFrom} onChange={this.onPriceFromChange} style={{ "width" : "75px", "WebkitAppearance" : "none", "margin" : "0 0 0 2px", "MozAppearance" : "textfield"}} />
              <input type="number" placeholder="Price to" value={this.state.priceTo} onChange={this.onPriceToChange} style={{ "width" : "75px", "WebkitAppearance" : "none", "margin" : "0 2px 0 2px", "MozAppearance" : "textfield"}} />
              <input type="text" placeholder="District" value={this.state.district} onChange={this.onDistrictChange} style={{"width" : "75px"}} />
              <button onClick={() => this.loadApartmens(0)}> Search </button>
                <table style={{ "margin" : "6px 0 0 3px", "borderSpacing" : "5px 5px"}}>
                    <thead></thead>
                    <tbody>
                    {this.state.value == "offers" && <tr><th>Id</th><th>User Id</th><th>Title</th><th>Content</th><th>Address</th><th>Square (m)</th><th>Price (USD)</th></tr>}    
                    {this.state.value == "offers"  && 
                        this.state.apartments.map(apartment =>(
                            <tr key={apartment.id}>
                                <th>{apartment.id}</th><th>{apartment.userId}</th><th>{apartment.title}</th><th>{apartment.content}</th><th>{apartment.address}</th><th>{apartment.square}</th><th>{apartment.price}</th>
                            </tr>
                        ))
                    }
                    {this.state.value == "demands" && <tr><th>Id</th><th>User Id</th><th>Title</th><th>Content</th><th>Prefer address</th><th>Square (m)</th><th>Price cap (USD)</th></tr>}
                    {this.state.value == "demands"  && 
                    this.state.apartments.map(apartment =>(
                        <tr key={apartment.id}>
                            <th>{apartment.id}</th><th>{apartment.userId}</th><th>{apartment.title}</th><th>{apartment.content}</th><th>{apartment.preferAddress}</th><th>{apartment.square}</th><th>{apartment.priceCap}</th>
                        </tr>
                    ))}
                    </tbody>
                </table> 
                <div>
                    {buttons}
                </div>
          </div>
        );
    }
}

window.ReactDOM.render(
    <UserSearchForm />,
    document.getElementById("search")
);