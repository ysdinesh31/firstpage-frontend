import React from "react";
import "./App.css";
import { services } from "./services/services";
import { withRouter } from "react-router-dom";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import PieChart from "highcharts-react-official";
import { connect } from "react-redux";
import { Row, Col, Preloader } from "react-materialize";
import ReactHighcharts from "react-highcharts";
import * as actionCreators from "./actions/actions";
import { pusher } from "./Pusher";

const config1 = {
  chart: {
    plotBackgroundColor: null,
    backgroundColor: "rgb(196, 196, 228)",
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie"
  },
  title: {
    text: "User Task statistics"
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %"
      }
    }
  },
  series: [
    {
      name: "Task Status",
      colorByPoint: true,
      data: [
        { name: "Assigned" },
        { name: "In Progress" },
        { name: "Completed" }
      ]
    }
  ]
};
const config2 = {
  chart: {
    plotBackgroundColor: null,
    backgroundColor: "rgb(196, 196, 228)",
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie"
  },
  title: {
    text: "Admin Task statistics"
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %"
      }
    }
  },
  series: [
    {
      name: "Task Status",
      colorByPoint: true,
      data: [
        { name: "Assigned" },
        { name: "In Progress" },
        { name: "Completed" }
      ]
    }
  ]
};

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      adminData: [],
      loading: true
    };
  }
  componentDidMount() {
    //debugger;

    services
      .profile()
      .then(Response => {
        this.props.userProfile(Response.data);
        this.setState(
          {
            data: Response.data.data,
            adminData: Response.data.adminData,
            loading: false
          },
          () => {
            let chart1 = this.refs.chart1.getChart();
            chart1.series[0].setData(this.state.data);
            if (this.props.Role === "Admin") {
              let chart2 = this.refs.chart2.getChart();
              chart2.series[0].setData(this.state.adminData);
            }
          }
        );

        var channel = pusher.subscribe(
          "private-TaskCreateChannel." + Response.data.user.id
        );

        channel.bind("App\\Events\\TaskCreateEvent", () => {
          alert("New Task Assigned!");
        });
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          //debugger;
          this.props.history.push("/logout");
        }
      });
  }

  render() {
    //debugger;
    if (this.state.loading) return <Preloader size="big"></Preloader>;
    return (
      <div>
        <h3 style={{ textAlign: "center", marginTop: "5%", color: "#00767d" }}>
          Welcome {this.props.Name}
        </h3>
        <div>
          <Row style={{ marginTop: "4%" }}>
            <Col s={1}>
              <ReactHighcharts config={config1} ref="chart1" />
            </Col>

            {this.props.Role === "Admin" && (
              <Col s={1}>
                <ReactHighcharts config={config2} ref="chart2" />
              </Col>
            )}
          </Row>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  //debugger;
  return {
    Name: state.AuthReducer.Name,
    Email: state.AuthReducer.Email,
    Role: state.AuthReducer.Role
  };
};

const mapDispatchToProps = dispatch => {
  //debugger;
  return {
    userProfile: data => dispatch(actionCreators.userProfile(data)),
    login: () => dispatch(actionCreators.login())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Welcome));
