let menuItems = [
  {
    name: "Student",
    class: "fas fa-graduation-cap"
  },
  {
    name: "User",
    class: "fas fa-user"
  },
  {
    name: "Calender",
    class: "fas fa-calendar-alt"
  },
  {
    name: "Curriculam",
    class: "fas fa-list-alt"
  },
  {
    name: "Tests",
    class: "fas fa-clipboard"
  },
  {
    name: "Reminders",
    class: "fas fa-clock"
  },
  {
    name: "Revenue",
    class: "fas fa-comment-dollar"
  },
  {
    name: "Search",
    class: "fab fa-searchengin"
  },
  {
    name: "Settings",
    class: "fas fa-sliders-h"
  },
  {
    name: "Timetable",
    class: "fas fa-calendar-alt"
  },
  {
    name: "Result",
    class: "fas fa-chart-pie"
  }
]

let menuDetails = {
  menu_title: "Curriculam",
  menu_list: [
    {
      title:"Mark entry",
      link:"entry"
    },
    {
      title:"Rule setup",
      link:"setup"
    },
    {
      title:"Component configuration",
      link:"configuration"
    },
    {
      title:"Copy template",
      link:"template"
    },
    {
      title:"Mark upload",
      link:"upload"
    },
    {
      title:"View report card",
      link:"view"
    },
    {
      title:"Mark card",
      link:"mark"
    },
    {
      title:"Add card item",
      link:"add"
    }
  ]
}
let componentList = [
]

class SideNavItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let props = this.props;
    return (
        <a href="#" title={props.name} className={( props.name=='Curriculam' ? 'active' : '')}>
          <i className={props.class} />
        </a>     
    );
  }
}

class SideMenu extends React.Component {
  constructor (props) {
    super(props);

    this.state = menuDetails;
  }

  render () {
    let state = this.state;
    return (   
      <div className="side-menu">
        <div className="side-menu-header">{state.menu_title}</div>
        <div className="side-menu-list">
        {state.menu_list.map((item, i) => <a href={"#"+item.link} className={( item.link=='configuration' ? 'active' : '')}>{item.title}</a>)}
        </div>
        <div className="side-menu-footer">© Powered by Nexquare</div>
      </div>   
    );
  }
}

class Modal extends React.Component {
  constructor (props) {
    super(props);
    this.clickCloseModal = this.clickCloseModal.bind(this);
    this.clickDeleteConfirm = this.clickDeleteConfirm.bind(this);
  }
  
  clickCloseModal () {    
    this.props.clickCloseModal();
  }
  
  clickDeleteConfirm () {    
    this.props.clickDeleteConfirm();
    this.props.clickCloseModal();
  }

  render () {
    return ( 
      <div className="modal show" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <i className="fas fa-times-circle p-b-40" />
              <h4 className="font-weight-bold p-b-40">Are you sure you want to delete the component?</h4>
              <div className="btns">
                <button className="btn btn-secondary m-r-25" onClick={this.clickCloseModal}>No, cancel it</button>
                <button className="btn btn-primary" onClick={this.clickDeleteConfirm}>Delete component</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ComponentItem extends React.Component {
  constructor (props) {
    super(props);
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  
  onClickDelete () {    
    this.props.onClickDelete(this.props.values.id,this.props.boxHandler);
  }

  render () {
    let values = this.props.values;
    return ( 
      <div className="col-4 component-frame">
        <div className="component-title">
          <span className="component-name">{values.name}</span>
          <i className="far fa-trash-alt component-delete" onClick={this.onClickDelete} />
        </div>
        <div className="component-holder">
          <input className="component-input" value={values.name} disabled />
        </div>
      </div>
    )
  }
}

class ComponentCard extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let components_list = this.props.components;
    return ( 
      components_list.map((item, i) => (
        <ComponentItem values={item} onClickDelete={this.props.openModal} boxHandler={this.props.boxHandler} />
      ))
    );
  }
}

class ComponentsBox extends React.Component {
  constructor (props) {
    super(props);
    this.state = {components: this.props.components};
    this.boxHandler = this.boxHandler.bind(this);
  }

  boxHandler(new_list) {
    this.setState({
      components: new_list
    })
  }
  
  render () {
    let components = this.state.components;
    let content = {};
    if(components.length){
      content = (
        <div className="row components-container">
          <ComponentCard components={components} openModal={this.props.openModal} boxHandler={this.boxHandler} />
        </div>
      );
    } else {
      content = (
        <div className="no-comp-contaner">
          <div className="no-comp-icon"><i className="fas fa-th-large" /></div>
          <div className="no-comp-title">No components yet</div>
          <div className="no-comp-text">Create and configure components for which teachers will be entering marks</div>
        </div>
      );
    }
    return (  
      <div className="content-box components">
        <h5 className="font-weight-bold">Components</h5>
        {content}
      </div>
      );
    }
  }


class SettingsBox extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (  
      <div >
      <div className="content-box settings">
        <h5 className="font-weight-bold">General settings</h5>
        <div className="row">
          <div className="col-2">
            <div className="select-label">Year</div>
            <select className="form-control">
              <option value hidden selected>Select item</option>
              <option value={1990}>1990</option>
              <option value={2000}>2000</option>
              <option value={2010}>2010</option>
            </select>
          </div>
          <div className="col-2">
            <div className="select-label">Grade</div>
            <select className="form-control">
              <option value hidden selected>Select grade</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="X">X</option>
            </select>
          </div>
          <div className="col-2">
            <div className="select-label">Name</div>
            <select className="form-control">
              <option value hidden selected>Select section</option>
              <option value="John">John</option>
              <option value="James">James</option>
              <option value="Jenn">Jenn</option>
            </select>
          </div>
          <div className="col-4">
            <div className="select-label">Subject</div>
            <select className="form-control">
              <option value hidden>Select item</option>
              <option value="Health and safety habbits" selected>Health and safety habbits</option>
              <option value="Biology">Biology</option>
              <option value="Math">Math</option>
            </select>
          </div>
          <div className="col-2">
            <div className="select-label">Term</div>
            <select className="form-control">
              <option value hidden selected>Select term</option>
              <option value={1990}>1990</option>
              <option value={2000}>2000</option>
              <option value={2010}>2010</option>
            </select>
          </div>
        </div>
      </div>
      {/* /.content-box.settings */} 
      </div>
    );
  }
}


class ConfigView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {components: componentList, last_added: componentList.length, isModalOpen: false, selected_component:0};
  
    this.onAddToList = this.onAddToList.bind(this);
    this.onDeleteList = this.onDeleteList.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  onAddToList () {
    let id = this.state.last_added + 1; 
    this.state.components.push({
      id: id,
      name: "Compnent " + id
    }); 
    this.setState({
      components: this.state.components,
      last_added: id,
      isModalOpen: this.state.isModalOpen,
      selected_component: 0
    });
  }
  
  onDeleteList () {
    let id = this.state.selected_component; 
    this.state.components = this.state.components.filter(list => list.id !== id); 
    this.state.boxHandler(this.state.components); 
    this.setState({
      components: this.state.components,
      last_added: this.state.last_added,
      isModalOpen: this.state.isModalOpen,
      selected_component: 0
    });
  }
  
  openModal(id, boxHandler) {
    this.setState({
      components: this.state.components,
      last_added: this.state.last_added,
      isModalOpen: true,
      selected_component: id,
      boxHandler: boxHandler
    });
  }
  
  closeModal () {
    this.setState({
      components: this.state.components,
      last_added: this.state.last_added,
      isModalOpen: false,
      selected_component: this.state.selected_component
    });
  }

  render () {
    return ( 
      <div>
        <div className="add-container">
          <button className="btn btn-warning add-btn" onClick={this.onAddToList}><i className="fas fa-plus" /> &nbsp;&nbsp;&nbsp;Add component</button>
        </div>    
        <SettingsBox />
        <ComponentsBox components={this.state.components} openModal={this.openModal} />
        {(this.state.isModalOpen ? <Modal clickCloseModal={this.closeModal}  clickDeleteConfirm={this.onDeleteList} /> : '')}
      </div>    
      );
    } 
} 

function MainView(props){
  return (   
    <div id="home">
      <h4 className="font-weight-bold">{props.title}</h4>
      <span>{props.nav}</span> / <strong>{props.title}</strong>
      <ConfigView />
    </div>
  );
} 

function Header(props){
  return (    

      <header>
        {/* NAV */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top row">
          <div className="col-4">
            <span className="logo">
              <i className="fab fa-app-store" />
            </span>
            <span className="logo-text">{props.name}</span>
          </div>
          <div className="col-8 text-right">
            <span className="notification">
              <i className="fas fa-bell" />
            </span>
            <span className="profile-pic">
              <img src="img/head.png" />
            </span>
            <span className="profile-name">
              {props.user_name}
            </span>
            <span className="profile-options-toggle">
              <i className="fas fa-chevron-down" />
            </span>
          </div>
          {/* /.navbar-collapse */}
        </nav>
      </header>
    );
}

function App(props){
    let items = menuItems.map((item, i) => <SideNavItem name={item.name} class={item.class} />);
    return (
      <div>
        <Header name="Culcheth High School" user_name="Mike Simons" />
        <div className="sidenav"> 
        {items}
        </div>
        <SideMenu />
        <MainView title="Component configuration" nav="Curriculam" />
      </div>
    );
}

ReactDOM.render(<App />, document.getElementById('app'));