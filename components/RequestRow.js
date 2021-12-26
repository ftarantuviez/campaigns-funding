import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import getCampaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

export default class RequestRow extends Component {
  state = {
    loading: false,
  };
  onApprove = async () => {
    this.setState({ loading: true });
    try {
      const campaign = getCampaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });

      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      console.log(error);
    }

    this.setState({ loading: false });
  };

  onFinalize = async () => {
    this.setState({ loading: true });
    try {
      const campaign = getCampaign(this.props.address);
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.finalizeRequest(this.props.id).send({
        from: accounts[0],
      });

      Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      console.log(error);
    }

    this.setState({ loading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {approversCount}
        </Cell>
        <Cell>
          {" "}
          {request.complete ? null : (
            <Button
              color={"green"}
              basic
              onClick={this.onApprove}
              loading={this.state.loading}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {" "}
          {request.complete ? null : (
            <Button
              color={"teal"}
              basic
              onClick={this.onFinalize}
              loading={this.state.loading}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}
