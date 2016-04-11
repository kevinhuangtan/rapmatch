////////////////////////////////////////////////
//////////////*~ Dependencies ~*////////////////
////////////////////////////////////////////////

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Container = React.createClass({
  getInitialState:function(){
    return {
      request:false,
      sent:false
    }
  },
  handleClick: function(){
    this.setState({request:true})
  },
  handleSubmit:function(e){
    e.preventDefault();
    console.log(this.refs.email.value);
    var email = this.refs.email.value;
    var self = this;
    $.post("/requestInvite",
    {
      email:email
    },
    function(data, status){
      console.log(data)
    });
    self.setState({sent : true})

  },
  render: function(){
    var Request;
    Request = <button key={1} onClick={this.handleClick}>request invite</button>
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
            <p>Find beats and freestyles by swiping like Tinder</p>
            <div className="request-holder">
              <ReactCSSTransitionGroup className="css-transition" transitionName="request" >
                {Request}
              </ReactCSSTransitionGroup>
          </div>
          </div>
        </section>
        <section className="Slide Slide1">
          <ReactCSSTransitionGroup className="css-transition" transitionName="example" transitionEnterTimeout={1500} transitionAppear={true} transitionLeave={true} transitionEnter={true} transitionAppearTimeout={1500}  transitionLeaveTimeout={400}>
            <div className="container">
              <div className="img-container">
                <img src="/images/ios.png"/>
              </div>
            <ul>
              <li>Discover by swiping</li>
              <li>Get a match</li>
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
