import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xC8746aFCCe556262bbB395C1B4fF4555717B0B1b"
);

export default instance;
