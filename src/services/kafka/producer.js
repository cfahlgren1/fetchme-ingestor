const Kafka = require("node-rdkafka");
// read the KAFKA Brokers and KAFKA_TOPIC values from the local file config.js
const externalConfig = require("./config");

const produceMessage = (message) => {
  // construct a Kafka Configuration object understood by the node-rdkafka library
  // merge the configuration as defined in config.js with additional properties defined here
  const kafkaConf = {
    ...externalConfig.kafkaConfig,
    ...{ "socket.keepalive.enable": true, debug: "generic,broker,security" },
  };

  // initialize producer connection from config.js
  const topic = externalConfig.topic; // create a Kafka Producer - connected to the KAFKA_BROKERS defined in config.js
  const producer = new Kafka.Producer(kafkaConf);
  prepareProducer(producer); // initialize the connection of the Producer to the Kafka Cluster
  producer.connect();
  const kafkaMessage = JSON.stringify(message); // object to string for k:v pair

  function prepareProducer(producer) {
    // event handler attached to the Kafka Producer to handle the ready event that is emitted when the Producer has connected sucessfully to the Kafka Cluster
    producer.on("ready", (arg) => {
      console.log(
        `Producer connection to Kafka Cluster is ready; message production starts now`
      );
      producer.produce(topic, -1, new Buffer.from(kafkaMessage));
      console.log("Produced message!");
      producer.disconnect();
      console.log("Closing producer connection.");
    });

    // exit process on disconnect
    producer.on("disconnected", (arg) => process.exit());

    // on error, log and exit producer
    producer.on("event.error", (err) => {
      console.error(err);
      process.exit(1);
    });
  }
};

module.exports = { produceMessage };
