import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../store/actions/dashboard";
import * as Authactions from "../store/actions/auth";
import Hoc from "../hoc/hoc";

class Dashboard extends React.PureComponent {

  componenWillMount() {

  }

  componentDidMount() {
    // if (this.props.token !== undefined && this.props.token !== null) {
    // this.props.getDrList(this.props.token);
    this.props.getUserProfile();
    // }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getDrList(newProps.token);
        this.props.getUserProfile();
      }
    }
  }

  renderItem(item) {
    return ''
  }

  render() {
    console.log(this.props, "render")

    let showItemRecords = ""
    if (this.props.dr_list) {

      showItemRecords = this.props.dr_list.map((list, i) => {

        return (
          <Link key={i} to={"/appointment/" + list.id}>

            <li className="list-group-item">{list.first_name} {list.last_name}</li>
          </Link>
        )
      })
    } else {
      showItemRecords = <li className="list-group-item">No Data...</li>
    }


    return (
      <Hoc>
        {this.props.loading ? (
          'loading.....'
        ) : (
            <div>
              <h3 style={{ margin: "16px 0" }}>Dr List</h3>
              <Link to={"create"}>

                create
            </Link>
              <Link to={"profile/1"}>Link</Link>


              <ul className="list-group">
                {showItemRecords}

              </ul>


            </div>
          )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    token: state.auth.token,
    dr_list: state.dashboard.all_list,
    loading: state.dashboard.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDrList: token => dispatch(actions.getDrList(token)),
    getUserProfile :() => dispatch(Authactions.getUserProfile())
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard));
