import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ModalComp from './ModalComp';



class HelpfulReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reported: false,
      helpfulClicked: false,
      reportText: 'Report',
      helpVotes: this.props.helpVotes,
      showModal: false
    };
    this.report = this.report.bind(this);
    this.clickHelpful = this.clickHelpful.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }


  report() {
    if (!this.state.reported) {
      this.setState({
        reportText: 'Reported',
        reported: true,
      });
      axios.put(`http://localhost:3000/api/fec2/hrnyc/qa/questions/${this.props.id}/report`)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  clickHelpful() {
    if (!this.state.helpfulClicked) {
      this.setState({
        helpVotes: this.state.helpVotes + 1,
        helpfulClicked: true,
      });
      axios.put(`http://localhost:3000/api/fec2/hrnyc/qa/questions/${this.props.id}/helpful`)
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  addAnswer() {
    console.log('addAnswer');
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    // if (this.props.answerUsage) {
    //   console.log('HR this.props.prodName', this.props.prodName);
    // }
    return (
      <div>
        <div>
          Helpful?
          <a onClick={this.clickHelpful}> | Yes ({this.state.helpVotes}) | </a>
          {this.props.answerUsage && <a onClick={this.report}>{this.state.reportText}</a>}
          {!this.props.answerUsage &&
            <div>
              <a
                onClick={this.addAnswer}
                >Add Answer
              </a>
              <div>
                <ModalComp
                  isOpen={this.state.showModal}
                  handleCloseModal={this.handleCloseModal}
                  id={this.props.id}
                  question={false}
                  prodName={this.props.prodName}
                  question_body={this.props.question_body}
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default HelpfulReport;
