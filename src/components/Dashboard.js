import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../store/actions/dashboard";
import * as Authactions from "../store/actions/auth";
import * as dashboardActions from "../store/actions/dashboard";
import Hoc from "../hoc/hoc";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import { Breadcrumbs } from "@material-ui/core";
import SimpleImageSlider from "react-simple-image-slider";

class Dashboard extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      limit: 1,
      offset: 0,
      page: 0,
      images: [
        { url: "images/1.jpg" },
        { url: "images/2.jpg" },
        { url: "images/3.jpg" },
        { url: "images/4.jpg" },
        { url: "images/5.jpg" },
        { url: "images/6.jpg" },
        // { url: "images/7.jpg" },
      ]
    }
  }

  componenWillMount() {

  }

  componentDidMount() {

    // this.props.getUserProfile();
    this.props.getDiseaseList(this.state.limit, this.state.offset)
  }

  UNSAFE_componentWillReceiveProps(newProps) {

  }

  handleChangePage = (event, newPage) => {
    this.setState({ offset: parseInt(newPage) * this.state.limit, page: parseInt(newPage) });
    setTimeout(() => {
      this.props.getDiseaseList(this.state.limit, this.state.offset)
    }, 1000);

  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ limit: parseInt(event.target.value), offset: 0, page: 0 })
    setTimeout(() => {
      this.props.getDiseaseList(this.state.limit, this.state.offset)
    }, 1000);
  };

  getchildData = val => {
    let data = val.map((k, i) => {
      return (<li className="">{k}</li>)
    })
    return data;
  }

  render() {
    const { loginUser, data_list } = this.props
    let totalCount = data_list.count ? data_list.count : 0;

    let city = [
      { city: "Bogotá", child: ["Tocaima", "Chía"] },
      { city: "Cartagena" },
      { city: "El Portal" },
      { city: "Fort Lauderdale" },
      { city: "Medellín", child: ["San Jerónimo", "Sabaneta", "Envigado"] }
    ]

    let DataFooterList = city.map((val, index) => {
      return (<li className="">{val.city}
        {val.child && val.child.length ? <ul>  {this.getchildData(val.child)} </ul> : ""}
      </li>)


    })


    let RenderList = data_list.rows ? data_list.rows.map((val, index) => {
      return (
        <div>
          <Card className="w-100">
            <CardActionArea>
              <CardMedia
                className="h-200"
                image={val.icon}
                title={val.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {val.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {val.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Link to={'/disease-doctors/' + val.disease_id}>

                <Button size="small" variant="contained" color="primary">
                  View All Doctors
                </Button>
              </Link>
            </CardActions>
          </Card>

        </div>

      )
    }) : "";

    return (
      <Hoc>
        {this.props.loading ? (
          'loading.....'
        ) : (
          <>

            <div>
              <SimpleImageSlider
                width="100%"
                height={504}
                images={this.state.images}
                showBullets={true}
                showNavs={false}
              />
            </div>
            <hr />
            <div className="container">
              <div>
                <img src="./assets/logo-e1580190137528-1536x215.png" className="home-page-image" />
              </div>
              <div class="vc_separator wpb_content_element vc_separator_align_center vc_sep_width_10 vc_sep_pos_align_center vc_separator_no_text vc_sep_color_black">
                <span class="vc_sep_holder vc_sep_holder_l">
                  <span class="vc_sep_line">
                  </span>
                </span>
                <span class="vc_sep_holder vc_sep_holder_r"><span class="vc_sep_line"></span></span>
              </div>
            </div>
          </>
        )

        }

        <div className="container">
          {DataFooterList}
        </div>


      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    data_list: state.dashboard.all_disease_list,
    loading: state.dashboard.loading,
    loginUser: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {

    getUserProfile: () => dispatch(Authactions.getUserProfile()),
    getDiseaseList: (limit, offset) => dispatch(dashboardActions.getDiseaseList(limit, offset))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard));
