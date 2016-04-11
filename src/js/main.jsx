////////////////////////////////////////////////
//////////////*~ Dependencies ~*////////////////
////////////////////////////////////////////////

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Parse = require('parse');
var PARSE_APP_ID = "hY3y4qnV3BAVNBxbSZVF4I4flC053j8p75I5XbOi"
var PARSE_JAVASCRIPT_KEY = "IgukkEetAsOH8kslRiyiZC8pwCO55lyd5beM7AJY"
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);

var MAX_INVITE = 86;

var Container = React.createClass({
  getInitialState:function(){
    return {
      request:false,
      sent:false,
      invites : 0
    }
  },
  componentDidMount:function(){
    // var invites = 86;
    var query = new Parse.Query('Signup');
    var self = this;
    query.find().then(function(signups){
      self.setState({invites : MAX_INVITE - signups.length});
    })
  },
  handleClick: function(){
    this.setState({request:true})
  },
  handleSubmit:function(e){
    e.preventDefault();
    var email = this.refs.email.value;
    var self = this;
    $.post("/requestInvite",
    {
      email:email
    },
    function(data, status){
      console.log(data);
      var query = new Parse.Query('Signup');
      query.find().then(function(signups){
        console.log(signups)
        self.setState({
          sent: true,
          invites : MAX_INVITE - signups.length
        })
      });
    });


  },
  render: function(){
    var remaining = this.state.invites;
    var Request;
    Request = <button key={1} onClick={this.handleClick}>request invite <span className="remaining">({remaining} remaining)</span></button>
    if(this.state.sent){
      Request = <p>Thank you for your interest. We will notify you shortly.</p>
    }
    else if(this.state.request){
      Request = <form key={2}><input type="text" placeholder="email" ref="email"/><button key={1} onClick={this.handleSubmit}>submit</button> </form>
    }
    return (
      <div className="Container">
        <section className="Slide Slide0">
          <ReactCSSTransitionGroup className="css-transition" transitionName="example" transitionEnterTimeout={1500} transitionAppear={true} transitionLeave={true} transitionEnter={true} transitionAppearTimeout={1500}  transitionLeaveTimeout={400}>
            <img src="/images/main.png"/>
          </ReactCSSTransitionGroup>

          <div className="title-container">
            <h1 className="title">RAP MATCH</h1>
            <p>Connect with rappers and producers by swiping like Tinder</p>
            <div className="request-holder">
              <ReactCSSTransitionGroup className="css-transition" transitionName="request" >
                {Request}
              </ReactCSSTransitionGroup>
          </div>
          </div>
          <span className="glyphicon glyphicon-chevron-down"></span>

        </section>
        <section className="Slide Slide1">
          <ReactCSSTransitionGroup className="css-transition" transitionName="example" transitionEnterTimeout={1500} transitionAppear={true} transitionLeave={true} transitionEnter={true} transitionAppearTimeout={1500}  transitionLeaveTimeout={400}>
            <div className="container">
              <div className="img-container">
                <img src="/images/ios.png"/>
              </div>
            <ul>
              <li><strong>Rappers</strong> find beats and <strong>producers</strong> find rappers to use their beats</li>
              <li>Match and connect with an artist</li>
              <li>Expand your network</li>
            </ul>
            </div>
        </ReactCSSTransitionGroup>

        </section>

      </div>
    )
  }
});

////////////////////////////////////////////////
/////////////////*~ Render ~*///////////////////
////////////////////////////////////////////////

ReactDOM.render(
  <div>
    <Container />
  </div>,
  document.getElementById('root')
);
