import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    isLoading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (!window.ethereum) {
      return alert("Please install Metamask!");
    }
    this.setState({ isLoading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });

      Router.pushRoute("/");
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ isLoading: false });
  };

  render() {
    return (
      <Layout>
        <h3>New Campaign!</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label={"wei"}
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(e) =>
                this.setState({ minimumContribution: e.target.value })
              }
            />
          </Form.Field>
          <Message error header={"Oops!"} content={this.state.errorMessage} />
          <Button
            content={"Create!"}
            primary
            type="submit"
            loading={this.state.isLoading}
          />
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
